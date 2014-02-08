###global Handlebars ###
###global mainJade ###

console.log 'NAME'

console.log 'Reading main template'
mainHbr = Handlebars.templates['mainHbr']

data = {name: 'NAME', description: 'DESCRIPTION'}

console.log 'Replacing html for #mainHbr'
$('#mainHbr').html mainHbr(data)


console.log 'Replacing #mainJade with jade main template'
$('#mainJade').html mainJade(data)

util= require 'util'
console.log 'app: ' + util.test()

core = require 'core'
core.alert 'NAME'

