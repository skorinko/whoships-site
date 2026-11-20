// Paddle checkout for /buy/ (src/buy.njk, in every site language). Paddle is the Merchant of Record; after payment, the license
// Worker (~/Workers/license-worker, shared by both apps) emails a Whoships key.
// Sandbox runs on localhost or with ?sandbox in the URL: test purchases whose keys only debug
// builds accept. Live: the price tools/paddle-catalog.py made; real sales need Paddle's approval
// of whoships.app as a website. After changing this file, bump ?v= in src/buy.njk.
(function () {
  var LIVE = { token: "live_3a65ae1bd0680dd040109a77e9b", priceId: "pri_01m7ssar2y90t724390sr3wnjw" };
  var SANDBOX = { token: "test_c7d371fa18d912ce29e467dcd44", priceId: "pri_01m7re1da9g4q61m6876vzemt4" };

  var params = new URLSearchParams(location.search);
  var local = location.hostname === "localhost" || location.hostname === "127.0.0.1";
  var sandbox = local || params.has("sandbox");
  var config = sandbox ? SANDBOX : LIVE;

  var button = document.getElementById("buy-button");
  var status = document.getElementById("buy-status");
  if (!button || !config.token || !config.priceId || !window.Paddle) return;
  // Localized pages put their strings on the button (src/buy.njk); English is the fallback.
  var d = button.dataset;
  var text = {
    buy: d.labelBuy || "Buy Whoships Lifetime",
    done: d.labelDone || "Purchase complete",
    sandbox: d.msgSandbox || "Sandbox mode: test purchases only. Use card 4242 4242 4242 4242.",
    thanks: d.msgThanks || "Thank you! Your license key is on its way{to}. It usually arrives within a minute; check your spam folder if you don't see it. In Whoships, click Enter License Key and paste it.",
    thanksTo: d.msgThanksTo || " to {email}"
  };

  if (sandbox) {
    Paddle.Environment.set("sandbox");
    status.textContent = text.sandbox;
  }

  Paddle.Initialize({
    token: config.token,
    checkout: { settings: { displayMode: "overlay", theme: "light", locale: d.paddleLocale || "en", allowLogout: false } },
    eventCallback: function (event) {
      if (window.posthog && (event.name === "checkout.loaded" || event.name === "checkout.completed")) {
        posthog.capture(event.name === "checkout.loaded" ? "checkout_opened" : "checkout_completed", { sandbox: sandbox });
      }
      if (event.name === "checkout.completed") {
        var email = event.data && event.data.customer && event.data.customer.email;
        status.textContent = text.thanks.replace("{to}", email ? text.thanksTo.replace("{email}", email) : "");
        button.textContent = text.done;
        button.setAttribute("aria-disabled", "true");
      }
    }
  });

  button.textContent = text.buy;
  button.classList.remove("waiting");
  button.removeAttribute("aria-disabled");
  button.addEventListener("click", function (e) {
    e.preventDefault();
    if (button.getAttribute("aria-disabled") === "true") return;
    Paddle.Checkout.open({
      items: [{ priceId: config.priceId, quantity: 1 }],
      // utm_* / ref: where this buyer came from (the app adds utm_source=<download source>&utm_medium=app).
      // The license Worker copies them onto the `purchase` analytics event.
      customData: Object.assign({ source: "whoships.app/buy" }, window.whoshipsAttribution ? window.whoshipsAttribution() : {})
    });
  });
})();
