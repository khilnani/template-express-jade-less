###global Handlebars ###

console.log 'NAME'

console.log 'Reading main template'
t = Handlebars.templates['main']

console.log 'Replacing html for #main'
$('#main').html t({name: 'NAME', description: 'DESCRIPTION'})

test = require 'test'
console.log test.test()
