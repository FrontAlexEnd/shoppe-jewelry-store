<template>
    <div class="default-layout">
        <SharedHeader />
            <main>
                <slot />
            </main>
        <SharedFooter />
    </div>
</template>

<style lang='scss'>
.default-layout {
    box-sizing: border-box;
  position: relative;
  min-height: 100vh;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 96px;
  display: flex;
  flex-direction: column;
  font-family: $ff-dm-sans;

  @media (max-width: 1200px) {
    padding: 0 40px;
  }

  @include vp-767 {
    padding: 0 16px;
  }
}
</style>