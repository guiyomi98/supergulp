'use strict';
const { to, set, from, fromTo } = gsap

const getVar = (key, elem = document.documentElement) => getComputedStyle(elem).getPropertyValue(key)

document.querySelectorAll('.radio').forEach(elem => {
    let svg = elem.querySelector('svg'),
        input = elem.querySelector('input')
    input.addEventListener('change', e => {
        fromTo(input, {
            '--border-width': '3px'
        }, {
            '--border-color': getVar('--c-active'),
            '--border-width': '12px',
            duration: .2
        })
        to(svg, {
            keyframes: [{
                '--top-y': '6px',
                '--top-s-x': 1,
                '--top-s-y': 1.25,
                duration: .2,
                delay: .2
            }, {
                '--top-y': '0px',
                '--top-s-x': 1.75,
                '--top-s-y': 1,
                duration: .6
            }]
        })
        to(svg, {
            keyframes: [{
                '--dot-y': '2px',
                duration: .3,
                delay: .2
            }, {
                '--dot-y': '0px',
                duration: .3
            }]
        })
        to(svg, {
            '--drop-y': '0px',
            duration: .6,
            delay: .4,
            clearProps: true,
            onComplete() {
                input.removeAttribute('style')
            }
        })
    })
})

document.querySelectorAll('.checkbox').forEach(elem => {
    let svg = elem.querySelector('svg'),
        input = elem.querySelector('input')
    input.addEventListener('change', e => {
        let checked = input.checked
        if(!checked) {
            return
        }
        fromTo(input, {
            '--border-width': '3px'
        }, {
            '--border-color': getVar('--c-active'),
            '--border-width': '12px',
            duration: .2,
            clearProps: true
        })
        set(svg, {
            '--dot-x': '14px',
            '--dot-y': '-14px',
            '--tick-offset': '20.5px',
            '--tick-array': '16.5px',
            '--drop-s': 1
        })
        to(elem, {
            keyframes: [{
                '--border-radius-corner': '14px',
                duration: .2,
                delay: .2
            }, {
                '--border-radius-corner': '5px',
                duration: .3,
                clearProps: true
            }]
        })
        to(svg, {
            '--dot-x': '0px',
            '--dot-y': '0px',
            '--dot-s': 1,
            duration: .4,
            delay: .4
        })
        to(svg, {
            keyframes: [{
                '--tick-offset': '48px',
                '--tick-array': '14px',
                duration: .3,
                delay: .2
            }, {
                '--tick-offset': '46.5px',
                '--tick-array': '16.5px',
                duration: .35,
                clearProps: true
            }]
        })
    })
})

document.querySelectorAll('.switch').forEach(elem => {
    let svg = elem.querySelector('svg'),
        input = elem.querySelector('input')
    input.addEventListener('pointerenter', e => {
        if(elem.animated || input.checked) {
            return
        }
        to(input, {
            '--input-background': getVar('--c-default-dark'),
            duration: .2
        })
    })
    input.addEventListener('pointerleave', e => {
        if(elem.animated || input.checked) {
            return
        }
        to(input, {
            '--input-background': getVar('--c-default'),
            duration: .2
        })
    })
    input.addEventListener('change', e => {
        let checked = input.checked
        let hide = checked ? 'default' : 'dot',
            show = checked ? 'dot' : 'default'
        fromTo(svg, {
            '--default-s': checked ? 1 : 0,
            '--default-x': checked ? '0px' : '8px',
            '--dot-s': checked ? 0 : 1,
            '--dot-x': checked ? '-8px' : '0px'
        }, {
            ['--' + hide + '-s']: 0,
            ['--' + hide + '-x']: checked ? '8px' : '-8px',
            duration: .25,
            delay: .15
        })
        fromTo(input, {
            '--input-background': getVar(checked ? '--c-default' : '--c-active'),
        }, {
            '--input-background': getVar(checked ? '--c-active' : '--c-default'),
            duration: .35,
            clearProps: true
        })
        to(svg, {
            keyframes: [{
                ['--' + show + '-x']: checked ? '2px' : '-2px',
                ['--' + show + '-s']: 1,
                duration: .25
            }, {
                ['--' + show + '-x']: '0px',
                duration: .2,
                clearProps: true
            }]
        })
    })
})

// resources in description
const mainTabs = document.querySelector("#gnb");
const mainSliderCircle = document.querySelector("#sliderItem");
const roundButtons = document.querySelectorAll(".gnbItem");

const colors = {
  blue: {
    50: {
      value: "#e3f2fd"
    },
    100: {
      value: "#bbdefb"
    }
  },
  green: {
    50: {
      value: "#e8f5e9"
    },
    100: {
      value: "#c8e6c9"
    }
  },
  purple: {
    50: {
      value: "#f3e5f5"
    },
    100: {
      value: "#e1bee7"
    }
  },
  orange: {
    50: {
      value: "#ffe0b2"
    },
    100: {
      value: "#ffe0b2"
    }
  },
  red: {
    50: {
      value: "#ffebee"
    },
    100: {
      value: "#ffcdd2"
    }
  }
};

const getColor = (color, variant) => {
  return colors[color][variant].value;
};

const handleActiveTab = (tabs, event, className) => {
  tabs.forEach((tab) => {
    tab.classList.remove(className);
  });

  if (!event.target.classList.contains(className)) {
    event.target.classList.add(className);
  }
};

mainTabs.addEventListener("click", (event) => {
  const root = document.documentElement;
  const targetColor = event.target.dataset.color;
  const targetTranslateValue = event.target.dataset.translateValue;

  if (event.target.classList.contains("round-button")) {
    mainSliderCircle.classList.remove("animate-jello");
    void mainSliderCircle.offsetWidth;
    mainSliderCircle.classList.add("animate-jello");

    root.style.setProperty("--translate-main-slider", targetTranslateValue);
    root.style.setProperty("--main-slider-color", getColor(targetColor, 50));
    root.style.setProperty("--background-color", getColor(targetColor, 100));

    handleActiveTab(roundButtons, event, "active");

    if (!event.target.classList.contains("gallery")) {
      root.style.setProperty("--filters-container-height", "0");
      root.style.setProperty("--filters-wrapper-opacity", "0");
    } else {
      root.style.setProperty("--filters-container-height", "3.8rem");
      root.style.setProperty("--filters-wrapper-opacity", "1");
    }
  }
});

const filterTabs = document.querySelector(".filter-tabs");
const filterButtons = document.querySelectorAll(".filter-button");

filterTabs.addEventListener("click", (event) => {
  const root = document.documentElement;
  const targetTranslateValue = event.target.dataset.translateValue;

  if (event.target.classList.contains("filter-button")) {
    root.style.setProperty("--translate-filters-slider", targetTranslateValue);
    handleActiveTab(filterButtons, event, "filter-active");
  }
});
