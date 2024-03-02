/*
 * @Author: Dreamice dreamice13@foxmail.com
 * @Date: 2024-03-04 17:48:49
 * @LastEditors: Dreamice dreamice13@foxmail.com
 * @LastEditTime: 2024-03-05 18:52:55
 * @FilePath: \CesiumShow\.eslintrc.cjs
 * @Description: 
 */
module.exports = {
  'env': {
    'browser': true,
    'es2021': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:vue/vue3-essential'
  ],
  'overrides': [
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module'
  },
  'plugins': [
    'vue'
  ],
  'rules': {
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'never'
    ]
  }
}
