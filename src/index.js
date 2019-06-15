import { useContext } from 'react'
import { ThemeContext } from 'styled-components'

import isObject from 'lodash/isObject'
import isNumber from 'lodash/isNumber'
import isString from 'lodash/isString'

export const get = (obj, ...paths) =>
  paths
    .join('.')
    .split('.')
    .reduce((a, b) => (a && a[b] ? a[b] : null), obj)

export const themeGet = (paths, fallback) => props =>
  get(props.theme, paths) || fallback

const px = n => `${n}px`
const isMediaQuery = arg => isNumber(arg)
const ensureArray = arg => (isString(arg) ? [arg] : arg || [])

const setResponsiveStyle = (key, values) => {
  let val, width, type, minWidth, maxWidth

  return values.map(value => {
    value = ensureArray(value)

    switch (value.length) {
      case 3:
        [minWidth, val, maxWidth] = value
        return `
          @media (min-width: ${px(minWidth)})
          and (max-width: ${px(maxWidth)}) {
            ${key}: ${val};
          }
        `
      case 2:
        [width, val] = value
        type = isMediaQuery(width) ? 'min' : 'max';
        [width, val] = type === 'min' ? [width, val] : [val, width]
        return `@media (${type}-width: ${px(width)}) { ${key}: ${val};}`
      default:
        return `${key}: ${value};`
    }
  })
}

const setResponsiveProp = ([key, prop, fallback]) => {
  if (!prop) throw new Error('ResponsiveProps: Expected at least 2 arguments.')

  return props => {
    return setResponsiveStyle(key, [
      ...ensureArray(fallback),
      ...ensureArray(get(props, prop))
    ])
  }
}

export const responsiveProp = props => setResponsiveProp(props)
export const responsiveProps = props => props.map(prop => responsiveProp(prop))

export const useTheme = (...path) => path.length === 0 ? useContext(ThemeContext) : path.join('.').split('.')
  .reduce((a, c) => (a && a[c] ? a[c] : null), useContext(ThemeContext))

export const useBreakpoint = breakpoint => {
  let breakpoints = useTheme('breakpoints')
  breakpoints =
    isNumber(breakpoint) && isObject(breakpoints)
      ? Object.values(breakpoints)
      : breakpoints
  return breakpoints[breakpoint]
}
