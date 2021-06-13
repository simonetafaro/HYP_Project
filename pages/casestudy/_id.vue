<template>
  <section class="container">
    <div class="container-custom">
      <div class="inner_caseMini">
        <section class="case-container">
          <header>
            <h1 class="area-title">{{ casestudy.area.title }}</h1>
            <h2 class="title-case">{{ casestudy.title }}</h2>
            <div class="sub-title">
              By {{ casestudy.teammembers[0].personName }} |
              {{ casestudy.createdData }}
            </div>
            <div class="column">
              <div class="single-column">
                <img :src="casestudy.banner" :alt="casestudy.altBanner" />
                <p class="description">
                  {{ casestudy.descriptiveText }}
                </p>

                <div class="partner-container">
                  <a
                    class="partner"
                    :href="casestudy.partnerWebsite"
                    target="_blank"
                    >PARTNER WEBSITE</a
                  >
                </div>
                <space-divider class="space-divider" />
                <h2 class="padding intro-container">CHALLENGE</h2>
                <h3 class="title-challenge">{{ casestudy.challengeTitle }}</h3>

                <div class="padding">
                  <div class="challenge-box">
                    <div class="challenge-container">
                      <p class="description">
                        {{ casestudy.challengeDescription }}
                      </p>
                    </div>
                  </div>
                </div>
                <h2 class="padding intro-container">SOLUTION</h2>
                <h3 class="title-challenge">{{ casestudy.solutionTitle }}</h3>
                <div class="padding">
                  <p class="description">
                    {{ casestudy.solutionDescription }}
                  </p>
                </div>
                <div v-if="nextCaseStudy != null" class="button">
                  <discover-button
                    :buttonLabel="'NEXT CASE STUDY'"
                    :path="'/casestudy/' + (casestudy.id + 1)"
                  ></discover-button>
                </div>
                <div v-else>
                  <discover-button
                    :buttonLabel="'GO BACK TO FIRST CASE STUDY'"
                    :path="'/casestudy/1'"
                  ></discover-button>
                </div>
              </div>
              <space-divider class="space-divider" />
              <div class="cases-column">
                <div class="other-cases-container">Other Case Studies</div>
                <div class="relatedCases-grid">
                  <div
                    v-for="(casestudy, caseStudyIndex) in relCases.slice(0, 4)"
                    :key="'casestudy-' + caseStudyIndex"
                    class="case-component"
                    @click="goTo(`/casestudy/${casestudy.id}`)"
                  >
                    <div class="related-image">
                      <img
                        :src="casestudy.banner"
                        :alt="casestudy.altBanner"
                        class="related-case-study-image"
                      />
                    </div>
                    <div class="related-case-study-info">
                      <h2 class="related-case-study-title">
                        {{ casestudy.title }}
                      </h2>
                      <div class="description-container">
                        <h3 class="related-case-study-description">
                          {{ casestudy.descriptiveText }}
                        </h3>
                      </div>
                      <div class="related-case-study-date">
                        {{ casestudy.createdData }}
                      </div>
                      <button class="case-button">FIND OUT MORE ></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>
        </section>
      </div>
      <div class="svg-bottom">
        <svg
          width="972"
          height="791"
          viewBox="0 0 972 791"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M182.055 304.024H243.001V425.166H182.055C148.396 425.166 121.11 398.048 121.11 364.595C121.11 331.143 148.396 304.024 182.055 304.024Z"
            fill="#E8E7FF"
          />
          <path
            d="M486.001 304.024H364.11V425.166H486.001V304.024Z"
            fill="#E8E7FF"
          />
          <path
            d="M486.001 425.171H364.11V547.094H486.001V425.171Z"
            fill="#F9F9FF"
          />
          <path d="M729 304.024H607.109V425.166H729V304.024Z" fill="#F9F9FF" />
          <path
            d="M607.109 304.024H485.999V425.166H607.109V304.024Z"
            fill="#F9F9FF"
          />
          <path
            d="M486.001 668.236H364.11V790.16H486.001V668.236Z"
            fill="#F9F9FF"
          />
          <path
            d="M364.108 304.024H242.999V425.166H364.108V304.024Z"
            fill="#E8E7FF"
          />
          <path
            d="M486.001 547.092H364.11V668.234H486.001V547.092Z"
            fill="white"
          />
          <path
            d="M486.001 182.102H364.11V304.025H486.001V182.102Z"
            fill="#F2F0FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M485.999 304.024H546.554C579.997 304.024 607.109 331.143 607.109 364.595C607.109 398.048 579.997 425.166 546.554 425.166H485.999V304.024Z"
            fill="#E8E7FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M485.999 668.236H546.554C579.997 668.236 607.109 695.53 607.109 729.198C607.109 762.866 579.997 790.16 546.554 790.16H485.999V668.236Z"
            fill="#F9F9FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M485.999 547.092H546.554C579.997 547.092 607.109 574.21 607.109 607.663C607.109 641.115 579.997 668.234 546.554 668.234H485.999V547.092Z"
            fill="#F2F0FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M425.056 60.9636C458.715 60.9636 486.001 88.0822 486.001 121.535V182.105H364.11V121.535C364.11 88.0822 391.397 60.9636 425.056 60.9636Z"
            fill="#F2F0FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M789.556 182.102C823 182.102 850.111 209.395 850.111 243.064V304.025H729.001V243.064C729.001 209.395 756.113 182.102 789.556 182.102Z"
            fill="#F9F9FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M546.554 182.102C579.997 182.102 607.109 209.395 607.109 243.064V304.025H485.999V243.064C485.999 209.395 513.11 182.102 546.554 182.102Z"
            fill="#F9F9FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M303.553 182.102C336.997 182.102 364.108 209.395 364.108 243.064V304.025H303.553C270.11 304.025 242.999 276.732 242.999 243.064C242.999 209.395 270.11 182.102 303.553 182.102Z"
            fill="#F9F9FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M303.553 668.236C336.997 668.236 364.108 695.53 364.108 729.198V790.16H242.999V729.198C242.999 695.53 270.11 668.236 303.553 668.236Z"
            fill="#F9F9FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M364.11 304.024H486.001C486.001 337.692 458.715 364.986 425.056 364.986C391.397 364.986 364.11 337.692 364.11 304.024Z"
            fill="#F9F9FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M729.001 243.068H850.111C850.111 276.736 823 304.029 789.556 304.029C756.113 304.029 729.001 276.736 729.001 243.068Z"
            fill="#F9F9FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M546.554 425.171C579.997 425.171 607.109 452.464 607.109 486.132C607.109 519.801 579.997 547.094 546.554 547.094H485.999V486.132C485.999 452.464 513.11 425.171 546.554 425.171Z"
            fill="#F2F0FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M182.055 425.171H243.001V486.132C243.001 519.801 215.715 547.094 182.055 547.094C148.396 547.094 121.11 519.801 121.11 486.132C121.11 452.464 148.396 425.171 182.055 425.171Z"
            fill="#F2F0FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M486.001 547.093H364.11C364.11 513.425 391.397 486.131 425.056 486.131C458.715 486.131 486.001 513.425 486.001 547.093Z"
            fill="#F9F9FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M971.998 304.029H850.107C850.107 270.361 877.394 243.068 911.053 243.068C944.712 243.068 971.998 270.361 971.998 304.029Z"
            fill="#F2F0FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M364.108 425.168H242.999C242.999 391.931 270.11 364.988 303.553 364.988C336.997 364.988 364.108 391.931 364.108 425.168Z"
            fill="#F9F9FF"
          />
          <path
            d="M850.111 547.092H729.001V668.234H850.111V547.092Z"
            fill="white"
          />
          <path
            d="M850.111 668.236H729.001V790.16H850.111V668.236Z"
            fill="#F9F9FF"
          />
          <path
            d="M364.108 425.171H242.999V547.094H364.108V425.171Z"
            fill="#F9F9FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M242.999 547.092H364.108V607.663C364.108 641.115 336.997 668.234 303.553 668.234C270.11 668.234 242.999 641.115 242.999 607.663V547.092Z"
            fill="#F9F9FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M486.001 0C486.001 33.6683 458.715 60.9618 425.056 60.9618C425.056 27.2935 452.342 0 486.001 0ZM364.11 121.924C364.11 88.2553 391.397 60.9618 425.056 60.9618C425.056 94.63 397.77 121.924 364.11 121.924ZM425.056 60.9618C391.397 60.9618 364.11 33.6683 364.11 0C397.77 0 425.056 27.2935 425.056 60.9618ZM425.056 60.9618C458.715 60.9618 486.001 88.2553 486.001 121.924C452.342 121.924 425.056 94.63 425.056 60.9618Z"
            fill="#F9F9FF"
          />
          <path
            d="M850.111 304.024H729.001V425.166H850.111V304.024Z"
            fill="#F9F9FF"
          />
          <path d="M121.11 668.236H0V790.16H121.11V668.236Z" fill="#E8E7FF" />
          <path
            d="M971.998 304.024H850.107V425.166H971.998V304.024Z"
            fill="#F2F0FF"
          />
          <path d="M121.11 425.171H0V547.094H121.11V425.171Z" fill="#F9F9FF" />
          <path
            d="M850.111 425.171H729.001V547.094H850.111V425.171Z"
            fill="#F9F9FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M729.001 425.171H789.556C823 425.171 850.111 452.464 850.111 486.132C850.111 519.801 823 547.094 789.556 547.094C756.113 547.094 729.001 519.801 729.001 486.132V425.171Z"
            fill="#E8E7FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M729.003 425.17C695.343 425.17 668.057 398.052 668.057 364.599C668.057 331.147 695.343 304.028 729.003 304.028V425.17Z"
            fill="#F2F0FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M729.001 425.166V304.024C762.661 304.024 789.947 331.143 789.947 364.595C789.947 398.048 762.661 425.166 729.001 425.166Z"
            fill="#F2F0FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M850.107 547.092H911.053C944.712 547.092 971.998 574.21 971.998 607.663C971.998 641.115 944.712 668.234 911.053 668.234H850.107V547.092Z"
            fill="#F2F0FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M850.108 668.234C816.88 668.234 789.944 641.115 789.944 607.663C789.944 574.21 816.88 547.092 850.108 547.092V668.234Z"
            fill="#F2F0FF"
          />
          <path d="M121.11 304.024H0V425.166H121.11V304.024Z" fill="#F9F9FF" />
          <path d="M729 547.092H607.109V668.234H729V547.092Z" fill="#F9F9FF" />
          <path
            d="M971.998 425.171H850.107V547.094H971.998V425.171Z"
            fill="#F9F9FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M668.054 425.171H729V547.094H668.054C634.395 547.094 607.109 519.801 607.109 486.132C607.109 452.464 634.395 425.171 668.054 425.171Z"
            fill="#F9F9FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M121.11 304.024H243.001C243.001 337.692 215.715 364.986 182.055 364.986C148.396 364.986 121.11 337.692 121.11 304.024Z"
            fill="#F9F9FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M485.999 304.024H607.109C607.109 337.692 579.997 364.986 546.554 364.986C513.11 364.986 485.999 337.692 485.999 304.024Z"
            fill="#F9F9FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M486.004 182.102C486.004 215.77 458.718 243.064 425.059 243.064C425.059 209.395 452.345 182.102 486.004 182.102Z"
            fill="#E8E7FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M607.109 304.024C640.768 304.024 668.054 331.318 668.054 364.986C634.395 364.986 607.109 337.692 607.109 304.024Z"
            fill="#F2F0FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M850.108 425.171C850.108 458.839 823.172 486.132 789.944 486.132C789.944 452.464 816.88 425.171 850.108 425.171Z"
            fill="#F9F9FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M121.106 182.102C121.106 215.77 94.1701 243.064 60.9424 243.064C60.9424 209.395 87.8788 182.102 121.106 182.102Z"
            fill="#F9F9FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M121.11 547.094V425.171C154.769 425.171 182.055 452.464 182.055 486.132C182.055 519.801 154.769 547.094 121.11 547.094Z"
            fill="#F9F9FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0 547.093C0 513.425 27.2862 486.131 60.9454 486.131C60.9454 519.799 33.6592 547.093 0 547.093Z"
            fill="#F2F0FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0 304.029C0 270.361 27.2862 243.068 60.9454 243.068C60.9454 276.736 33.6592 304.029 0 304.029Z"
            fill="#F9F9FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M364.11 425.168C364.11 391.931 391.397 364.988 425.056 364.988C425.056 398.224 397.77 425.168 364.11 425.168Z"
            fill="white"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M90.8322 660.418C72.7323 649.888 60.5548 630.206 60.5548 607.663C60.5548 585.12 72.7323 565.438 90.8322 554.908C108.932 565.438 121.11 585.12 121.11 607.663C121.11 630.206 108.932 649.888 90.8322 660.418ZM30.2774 660.418C12.1775 649.888 0 630.206 0 607.663C0 585.12 12.1775 565.438 30.2774 554.908C48.3772 565.438 60.5548 585.12 60.5548 607.663C60.5548 630.206 48.3772 649.888 30.2774 660.418Z"
            fill="#F2F0FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M577.027 660.418C559.044 649.888 546.945 630.206 546.945 607.663C546.945 585.12 559.044 565.438 577.027 554.908C595.01 565.438 607.109 585.12 607.109 607.663C607.109 630.206 595.01 649.888 577.027 660.418Z"
            fill="#E8E7FF"
          />
          <path
            d="M971.998 304.024H850.107V425.166H971.998V304.024Z"
            fill="#E8E7FF"
          />
          <path
            d="M364.108 547.092H242.999V668.234H364.108V547.092Z"
            fill="#F2F0FF"
          />
          <path
            d="M303.943 486.131H182.052V608.055H303.943V486.131Z"
            fill="white"
          />
          <path
            d="M364.108 425.171H242.999V547.094H364.108V425.171Z"
            fill="#F9F9FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M911.053 334.507C927.883 334.507 941.526 347.979 941.526 364.598C941.526 381.216 927.883 394.688 911.053 394.688C894.224 394.688 880.581 381.216 880.581 364.598C880.581 347.979 894.224 334.507 911.053 334.507Z"
            fill="#F9F9FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M303.946 334.507C320.776 334.507 334.419 347.979 334.419 364.598C334.419 381.216 320.776 394.688 303.946 394.688C287.117 394.688 273.474 381.216 273.474 364.598C273.474 347.979 287.117 334.507 303.946 334.507Z"
            fill="#F9F9FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M60.9459 334.507C77.7755 334.507 91.4186 347.979 91.4186 364.598C91.4186 381.216 77.7755 394.688 60.9459 394.688C44.1162 394.688 30.4731 381.216 30.4731 364.598C30.4731 347.979 44.1162 334.507 60.9459 334.507Z"
            fill="#E8E7FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M425.05 577.573C441.88 577.573 455.523 591.045 455.523 607.663C455.523 624.281 441.88 637.753 425.05 637.753C408.221 637.753 394.578 624.281 394.578 607.663C394.578 591.045 408.221 577.573 425.05 577.573Z"
            fill="#F9F9FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M546.943 455.649C563.773 455.649 577.416 469.296 577.416 486.13C577.416 502.964 563.773 516.611 546.943 516.611C530.113 516.611 516.47 502.964 516.47 486.13C516.47 469.296 530.113 455.649 546.943 455.649Z"
            fill="#F9F9FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M182.052 577.573C198.881 577.573 212.525 591.045 212.525 607.663C212.525 624.281 198.881 637.753 182.052 637.753C165.222 637.753 151.579 624.281 151.579 607.663C151.579 591.045 165.222 577.573 182.052 577.573Z"
            fill="#F2F0FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M668.055 455.649C684.885 455.649 698.528 469.296 698.528 486.13C698.528 502.964 684.885 516.611 668.055 516.611C651.225 516.611 637.582 502.964 637.582 486.13C637.582 469.296 651.225 455.649 668.055 455.649Z"
            fill="#F2F0FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M60.9459 577.573C77.7755 577.573 91.4186 591.045 91.4186 607.663C91.4186 624.281 77.7755 637.753 60.9459 637.753C44.1162 637.753 30.4731 624.281 30.4731 607.663C30.4731 591.045 44.1162 577.573 60.9459 577.573Z"
            fill="#F9F9FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M546.943 212.584C563.773 212.584 577.416 226.231 577.416 243.065C577.416 259.899 563.773 273.546 546.943 273.546C530.113 273.546 516.47 259.899 516.47 243.065C516.47 226.231 530.113 212.584 546.943 212.584Z"
            fill="#F9F9FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M182.052 455.649C198.881 455.649 212.525 469.296 212.525 486.13C212.525 502.964 198.881 516.611 182.052 516.611C165.222 516.611 151.579 502.964 151.579 486.13C151.579 469.296 165.222 455.649 182.052 455.649Z"
            fill="#E8E7FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M425.05 273.547C441.88 273.547 455.523 287.194 455.523 304.028C455.523 320.862 441.88 334.509 425.05 334.509C408.221 334.509 394.578 320.862 394.578 304.028C394.578 287.194 408.221 273.547 425.05 273.547Z"
            fill="#F9F9FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M911.053 577.573C927.883 577.573 941.526 591.045 941.526 607.663C941.526 624.281 927.883 637.753 911.053 637.753C894.224 637.753 880.581 624.281 880.581 607.663C880.581 591.045 894.224 577.573 911.053 577.573Z"
            fill="#F9F9FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M850.111 121.923C850.111 155.376 823 182.494 789.556 182.494C789.556 149.042 816.667 121.923 850.111 121.923ZM729.001 243.065C729.001 209.613 756.113 182.494 789.556 182.494C789.556 215.947 762.445 243.065 729.001 243.065ZM789.556 182.494C756.113 182.494 729.001 155.376 729.001 121.923C762.445 121.923 789.556 149.042 789.556 182.494ZM789.556 182.494C823 182.494 850.111 209.613 850.111 243.065C816.667 243.065 789.556 215.947 789.556 182.494Z"
            fill="#E8E7FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M668.057 729.198C668.057 695.53 695.343 668.236 729.003 668.236C729.003 701.904 701.716 729.198 668.057 729.198Z"
            fill="#E8E7FF"
          />
          <path
            d="M243.001 668.236H121.11V790.16H243.001V668.236Z"
            fill="#E8E7FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M243.001 668.235H121.11C121.11 634.999 148.396 608.055 182.055 608.055C215.715 608.055 243.001 634.999 243.001 668.235Z"
            fill="#F9F9FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M911.053 60.9636H971.998V182.105H911.053C877.394 182.105 850.107 154.987 850.107 121.535C850.107 88.0822 877.394 60.9636 911.053 60.9636Z"
            fill="#E8E7FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M60.9424 729.198C60.9424 695.53 87.8788 668.236 121.106 668.236C121.106 701.904 94.1701 729.198 60.9424 729.198Z"
            fill="#F2F0FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M971.998 668.236C971.998 701.904 944.712 729.198 911.053 729.198C911.053 695.53 938.339 668.236 971.998 668.236ZM850.107 790.16C850.107 756.491 877.394 729.198 911.053 729.198C911.053 762.866 883.767 790.16 850.107 790.16ZM911.053 729.198C877.394 729.198 850.107 701.904 850.107 668.236C883.767 668.236 911.053 695.53 911.053 729.198ZM911.053 729.198C944.712 729.198 971.998 756.491 971.998 790.16C938.339 790.16 911.053 762.866 911.053 729.198Z"
            fill="#F2F0FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M964.19 212.583C953.662 230.804 933.985 243.064 911.448 243.064C888.912 243.064 869.235 230.804 858.707 212.583C869.235 194.361 888.912 182.102 911.448 182.102C933.985 182.102 953.662 194.361 964.19 212.583Z"
            fill="#F9F9FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M546.944 486.131C546.944 519.799 519.658 547.093 485.999 547.093C485.999 513.425 513.285 486.131 546.944 486.131Z"
            fill="#F9F9FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M364.108 486.131C364.108 519.799 336.997 547.093 303.553 547.093C303.553 513.425 330.665 486.131 364.108 486.131ZM242.999 608.055C242.999 574.386 270.11 547.093 303.553 547.093C303.553 580.761 276.442 608.055 242.999 608.055ZM303.553 547.093C270.11 547.093 242.999 519.799 242.999 486.131C276.442 486.131 303.553 513.425 303.553 547.093ZM303.553 547.093C336.997 547.093 364.108 574.386 364.108 608.055C330.665 608.055 303.553 580.761 303.553 547.093Z"
            fill="#F2F0FF"
          />
        </svg>
      </div>
    </div>
    <section>
      <div class="box-members">
        <div class="inner-member">
          <h2 class="pre-section">TEAM WORKING ON THIS PROJECT</h2>
        </div>

        <section class="member-grid">
          <div
            v-for="(person, personIndex) of casestudy.teammembers"
            :key="'person-' + personIndex"
            class="person"
          >
            <member-mini
              :personName="person.personName"
              :occupation="person.occupation"
              :image="person.personPhoto"
              :index="personIndex"
              :id="person.id"
            ></member-mini>
          </div>
        </section>
      </div>
      <space-divider />

      <div class="other-cases-container">
        <div class="pre-section">YOU MAY BE INTERESTED IN</div>
        <div class="pre-section">OUR RELATED SERVICES</div>
      </div>

      <div class="service-box">
        <section class="service-grid">
          <div v-if="casestudy.services === 0">
            There are no related Services
          </div>
          <div
            v-for="(service, serviceIndex) in casestudy.services.slice(0, 3)"
            :key="'service-' + serviceIndex"
            class="service"
          >
            <service-mini
              :title="service.title"
              :image="service.banner"
              :path="service.id"
              :altBanner="service.altBanner"
              :serviceIndex="serviceIndex + 1"
            ></service-mini>
          </div>
        </section>
      </div>
      <div v-if="nextCaseStudy != null" class="button1">
        <discover-button
          :buttonLabel="'NEXT CASE STUDY'"
          :path="'/casestudy/' + (casestudy.id + 1)"
        ></discover-button>
      </div>
      <div v-else>
        <discover-button
          :buttonLabel="'GO BACK TO FIRST CASE STUDY'"
          :path="'/casestudy/1'"
        ></discover-button>
      </div>
    </section>
  </section>
</template>
<script>
import GoToMixins from '~/mixins/goTo-mixins.js'
import ServiceMini from '~/components/service/ServiceMini.vue'
import MemberMini from '~/components/team/MemberMini.vue'
import SpaceDivider from '~/components/utils/SpaceDivider.vue'
import DiscoverButton from '~/components/utils/DiscoverButton.vue'

export default {
  components: {
    ServiceMini,
    MemberMini,
    SpaceDivider,
    DiscoverButton,
  },
  async asyncData({ error, $axios, route }) {
    const { id } = route.params
    const { data } = await $axios.get(
      `${process.env.BASE_URL}/api/casestudy/${id}`
    )
    const casestudy = data
    if (casestudy == null) {
      return error({ statusCode: 404, message: 'Case study not found!' })
    }
    let relCases = await $axios.get(
      `${process.env.BASE_URL}/api/relatedCaseStudies/${data.areaID}/${id}`
    )

    let nextCaseStudy = await $axios.get(
      `${process.env.BASE_URL}/api/casestudy/${casestudy.id + 1}`
    )
    nextCaseStudy = nextCaseStudy.data
    relCases = relCases.data

    return {
      casestudy,
      relCases,
      nextCaseStudy,
    }
  },
  mounted() {
    this.resizeServiceCard()
    window.addEventListener('resize', this.resizeServiceCard)
  },
  destroyed() {
    window.removeEventListener('resize', this.resizeServiceCard)
  },
  mixins: [GoToMixins],
}
</script>

<style scoped>
h4 {
  margin-bottom: 10px;
  text-align: left;
}
h1 {
  text-align: left;
}
.sub-title {
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  color: #464a52;
  margin-bottom: 37px;
}
.intro-container {
  font-style: normal;
  font-weight: 700;
  font-size: 22px;
  line-height: 26px;
  color: var(--cc-base1);
}
.pre-section {
  text-align: center;
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  /* identical to box height */
  text-transform: uppercase;
  color: var(--cc-base1);
}
.casestudy {
  cursor: pointer;
  margin-bottom: 20px;
}
.space-divider {
  display: none;
}
.inner_caseMini {
  margin: auto;
  width: 100%;
  text-align: center;
  position: relative;
}
.container {
  min-width: 100%;
  margin: 0;
  padding: 0;
}
.container-custom {
  width: 100%;
  margin-top: 0;
  padding: 0;
  position: relative;
  overflow: hidden;
}
.box-members {
  background: #fbfbff;
}
.svg-bottom {
  bottom: -395px;
  right: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}
.service-grid {
  max-width: 1110px;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
  padding-top: 60px;
  display: grid;
  margin: auto;
}
.case-button {
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  text-transform: uppercase;
  color: var(--cc-base1);
  bottom: 30px;
  padding-top: 30px;
  text-align: center;
  margin: auto;
  border: none;
  background: none;
  cursor: pointer;
  display: none;
}
.case-button:hover {
  text-decoration: underline;
}
.description {
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 32px;
  color: var(--c-grey1);
  mix-blend-mode: normal;
  opacity: 0.8;
}
img {
  align-content: left;
  width: 90%;
  object-fit: cover;
  max-height: 375px;
  border-radius: 10px;
}
p {
  text-align: left;
  margin-top: 40px;
  width: 90%;
}

.partner {
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  /* identical to box height */
  text-decoration-line: underline;
  text-transform: uppercase;
  color: #4d41c9;
}
.partner-container {
  margin: 20px 0;
}
.other-cases-container {
  padding-bottom: 20px;
  font-style: normal;
  font-weight: bold;
  font-size: 22px;
  line-height: 26px;

  color: #464a52;
}
.padding {
  padding: 30px 0;
}
.member-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
  margin-top: 80px;
  max-width: 1110px;
  margin: auto;
}
.inner-member {
  padding: 80px 0;
}
.column {
  display: flex;
  justify-content: space-between;
}

.case-container {
  text-align: left;

  margin: 40px 13%;
}
.single-column {
  max-width: 70%;
  width: 90%;
}
.challenge-box {
  border-left: solid 7px rgba(151, 151, 151, 0.2);
}
.challenge-container {
  margin-left: 35px;
}

.person {
  margin-bottom: 20px;
  align-content: center;
}
.case-component {
  display: inline-flex;
  cursor: pointer;
  padding: 10px 0;
}
.cases-column {
  max-width: 30%;
}
.title-challenge {
  font-style: normal;
  font-weight: 700;
  font-size: 36px;
  line-height: 43px;
  color: var(--cc-base2);
}
.title-case {
  font-style: normal;
  font-weight: 700;
  font-size: 50px;
  line-height: 60px;
  color: var(--cc-base1);
  margin-bottom: 24px;
}
.area-title {
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  text-transform: uppercase;
  color: var(--cc-base1);
  margin-bottom: 20px;
}

.related-case-study-info {
  margin: auto;
  margin-left: 20px;
}
.related-case-study-image {
  border-radius: 50%;
  width: 95px;
  height: 95px;
  object-fit: cover;
}
.related-case-study-title {
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  color: var(--cc-base1);
}
.related-case-study-date {
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  color: var(--cc-base1);
  mix-blend-mode: normal;

  opacity: 0.8;
}
.related-case-study-description {
  padding: 0 30px;
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 17px;
  text-align: center;

  color: #464a52;
}
.description-container {
  display: none;
}
.service-box {
  margin: auto;
  padding-bottom: 60px;
}
.button {
  padding-bottom: 80px;
  display: none;
}
.button1 {
  padding-bottom: 80px;
}
@media screen and (max-width: 1200px) {
  .area-title {
    font-size: 20px;
    line-height: 24px;
    text-align: left;
    margin-bottom: 14px;
  }
  .title-case {
    font-size: 36px;
    line-height: 43px;
  }
  .sub-title {
    font-size: 16px;
    line-height: 19px;
    margin-bottom: 0px;
  }
  .description {
    font-size: 18px;
    line-height: 22px;
    color: #464a52;
    padding-bottom: 0px;
  }
  .intro-container {
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;
    text-align: center;
  }
  .column {
    display: block;
  }
  .cases-column {
    max-width: 100%;
  }
  .relatedCases-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 40px;
    margin-top: 85px;
    margin: auto;
  }
  .related-case-study-date {
    padding-top: 18px;
  }
  .case-button {
    display: block;
  }
  .case-component {
    display: inline-block;
    margin: 0 auto;
    text-align: center;
  }
  .related-case-study-info {
    margin: auto;
    text-align: center;
  }
  .space-divider {
    display: block;
    text-align: center;
  }
  .single-column {
    max-width: 100%;
    width: 100%;
  }
  p {
    text-align: left;
    margin-top: 20px;
    width: 100%;
  }
  img {
    margin: 40px 0;
    width: 100%;
    border-radius: 15px;
    max-height: 380px;
    overflow: hidden;
  }
  .partner {
    font-size: 18px;
    line-height: 22px;
    display: inline-block;
  }
  .partner-container {
    text-align: center;
    display: inline-block;
    width: 100%;
  }
  .related-image {
    padding: 20px 0;
  }
  .description-container {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }

  h3 {
    font-size: 20px;
    line-height: 24px;
  }
  .partner-container {
    margin-top: 78px;
  }
  .title-challenge {
    font-size: 28px;
    line-height: 29px;
    text-align: center;
  }
  .other-cases-container {
    text-align: center;
  }
  .related-case-study-title {
    text-align: center;
  }
  .member-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 40px;
    margin-top: 85px;
    margin: auto;
  }
  .service-box {
    margin: auto;
    margin-right: 92px;
    margin-left: 92px;
  }
  .service-grid {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 40px;
    padding-top: 85px;
    display: grid;
    margin: auto;
    margin-right: 58px;
    margin-left: 58px;
  }
  .pre-section {
    font-size: 20px;
    line-height: 24px;
  }
  .button {
    padding-bottom: 80px;
    display: block;
    text-align: center;
  }
  .button1 {
    padding-bottom: 80px;
    display: none;
  }
}
@media screen and (max-width: 768px) {
  .area-title {
    font-size: 12px;
    line-height: 14px;
  }
  .title-case {
    font-size: 24px;
    line-height: 29px;
    margin-bottom: 14px;
  }
  .sub-title {
    font-size: 10px;
    line-height: 12px;
    margin-bottom: 21px;
  }
  .description {
    font-size: 12px;
    line-height: 12px;
    color: #464a52;
    padding-bottom: 0px;
  }
  .intro-container {
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 14px;
  }
  .cases-column {
    display: none;
  }
  .single-column {
    max-width: 100%;
    width: 100%;
  }
  p {
    text-align: left;
    margin-top: 20px;
    width: 100%;
  }
  img {
    max-height: 180px;
    margin: 20px 0;
  }
  .partner {
    font-size: 14px;
    line-height: 17px;
    display: inline-block;
  }
  .partner-container {
    text-align: center;
    display: inline-block;
    width: 100%;
    margin-top: 15px;
  }
  .challenge-box {
    margin-bottom: 50px;
  }
  .padding {
    padding: 0px 0 15px 0;
  }
  h3 {
    font-size: 12px;
    line-height: 14px;
    text-align: center;
  }
  .title-challenge {
    font-size: 18px;
    line-height: 22px;
    text-align: center;
  }
  .member-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 13px;
    margin-top: 25px;
    margin: auto;
  }
  .service-box {
    margin: auto;
    margin-right: 35px;
    margin-left: 35px;
  }
  .service-grid {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 13px;
    padding-top: 20px;
    display: grid;
    margin: auto;
    margin-right: 0;
    margin-left: 0;
  }
  .pre-section {
    font-size: 12px;
    line-height: 14px;
  }
}
</style>
