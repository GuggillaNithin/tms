if (!customElements.get("site-footer")) {
  class SiteFooter extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
<section class="footer">
  <div class="subscribe-contact-row">
    <div class="container">
      <div class="subscribe-contact-wrapper">
        <div class="subscribe-wrapper">
          <div class="footer-subscribe">
            <div class="footer-subscribe-top">
              <h3 class="subscribe-title">
                Get our emails for info on new items, sales and more.
              </h3>
              <p class="subscribe-desc">
                We'll email you a voucher on your first order
              </p>
            </div>
            <div class="footer-subscribe-bottom">
              <form action="sendmail.php" method="POST">
                <input type="email" name="email" placeholder="Enter your email address" required />
                <button type="submit" name="subscribe" class="btn">Submit</button>
              </form>
              <p class="privacy-text">
                By subscribing you agree to our
                <a href="terms-and-conditions.html">Terms & Conditions and Privacy & Cookies Policy.</a>
              </p>
            </div>
          </div>
        </div>
        <div class="contact-wrapper">
          <div class="footer-contact-top" style="gap:10px;">
            <h3 class="contact-title">Need help? <br>
              <a href="tel:+971501090168" style="color:#fff;">+971 50 109 0168</a> /<br>
              <a href="tel:+97142665559" style="color:#fff;">+971 4 266 5559</a>
            </h3>
            <p class="contact-desc">We are available 9:00am - 8:00pm</p>
          </div>
          <div class="footer-contact-bottom">
            <p class="privacy-text" style="font-size:14px; color:#fff;">
              <strong>Address:</strong> Main Road Side - Al Siddiqui Metro St - Salah Al Din St - near Abu Baker Al Siddique Street - Deira - Dubai - United Arab Emirates
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="widgets-row">
    <div class="container">
      <div class="footer-widgets">
        <div class="brand-info">
          <div class="footer-logo">
            <a href="index.html" class="logo"><img src="img/tms-logo.png" width="140" alt="Total Media Solutions logo"></a>
          </div>
          <div class="footer-desc">
            One Stop Solution For All Your Advertising Needs !
          </div>
          <div class="footer-contact">
            <p>
              <a href="tel:+97142665559">+971 4 266 5559</a> -
              <a href="mailto:sales@tmsdubai.com">sales@tmsdubai.com</a>
            </p>
          </div>
          <div class="footer-contact">
            <p>
              <a href="tel:+971501090168">+971 50 109 0168</a> -
              <a href="mailto:akshay@tmsdubai.com">akshay@tmsdubai.com</a>
            </p>
          </div>
        </div>
        <div class="widget-nav-menu">
          <h4>Information</h4>
          <ul class="menu-list">
            <li>
              <a href="privacy-policy.html">Privacy Policy</a>
            </li>
            <li>
              <a href="return-policy.html">Returns Policy</a>
            </li>
            <li>
              <a href="terms-and-conditions.html">Terms & Conditions</a>
            </li>
          </ul>
        </div>
        <div class="widget-nav-menu">
          <h4>Shop</h4>
          <ul class="menu-list">
            <li>
              <a href="shop.html?category=featured">Featured Products</a>
            </li>
            <li>
              <a href="shop.html?category=new-arrivals">New Arrivals</a>
            </li>
            <li>
              <a href="shop.html?category=sales-products">Sale Products</a>
            </li>
          </ul>
        </div>
        <div class="widget-nav-menu">
          <h4>Categories</h4>
          <ul class="menu-list">
            <li>
              <a href="shop.html?category=indoor-media">Indoor Medias</a>
            </li>
            <li>
              <a href="shop.html?category=outdoor-media">Outdoor Medias</a>
            </li>
            <li>
              <a href="shop.html?category=accessories">Accessories</a>
            </li>
            <li>
              <a href="shop.html?category=led-lcd-displays">Led/Lcd Displays</a>
            </li>
            <li>
              <a href="shop.html?category=acrylic-products-fabrication">Acrylic Stands</a>
            </li>
             <li>
              <a href="shop.html?category=display-stands">Display Stands</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div class="copyright-row">
    <div class="copyright-row">
      <div class="container">
        <div class="footer-copyright">
          <div class="site-copyright">
            <p>
              Copyright 2026 &copy; Total Media Solutions. All right reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>`;
    }
  }

  customElements.define("site-footer", SiteFooter);
}