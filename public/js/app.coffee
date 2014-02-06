###global Handlebars ###

console.log 'NAME'

console.log 'Reading main template'
t = Handlebars.templates['main']

console.log 'Replacing html for #main'
$('#main').html t({name: 'NAME', description: 'DESCRIPTION'})

util= require 'util'
console.log 'app: ' + util.test()

core = require 'core'
core.alert 'Hello'

