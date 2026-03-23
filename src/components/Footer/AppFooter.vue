<script setup lang="ts">
</script>

<template>
    <footer class="footer">
        <div class="footer__copyright">
            <p>&copy; 2026 Shelly</p>
        </div>
        <div class="footer__network">
            <ul class="footer__network-list">
                <li class="footer__network-item">
                    <a class="footer__network-link" href="/" title="Linked In">
                        <svg class="footer__network-link-icon" aria-hidden="true">
                            <use xlink:href="/src/assets/sprite.svg#icon-linkedin"></use>
                        </svg>
                        <span class="visually-hidden">Linked In</span>
                    </a>
                </li>
                <li class="footer__network-item">
                    <a class="footer__network-link" href="/" title="Facebook">
                        <svg class="footer__network-link-icon" aria-hidden="true">
                            <use xlink:href="/src/assets/sprite.svg#icon-facebook"></use>
                        </svg>
                        <span class="visually-hidden">Facebook</span>
                    </a>
                </li>
                <li class="footer__network-item">
                    <a class="footer__network-link" href="/" title="Instagram">
                        <svg class="footer__network-link-icon" aria-hidden="true">
                            <use xlink:href="/src/assets/sprite.svg#icon-instagram"></use>
                        </svg>
                        <span class="visually-hidden">Instagram</span>
                    </a>
                </li>
                <li class="footer__network-item">
                    <a class="footer__network-link" href="/" title="Twitter">
                        <svg class="footer__network-link-icon" aria-hidden="true">
                            <use xlink:href="/src/assets/sprite.svg#icon-twitter"></use>
                        </svg>
                        <span class="visually-hidden">Twitter</span>
                    </a>
                </li>
            </ul>
        </div>
    </footer>
</template>

<style src="./AppFooter.scss" lang="scss"></style>