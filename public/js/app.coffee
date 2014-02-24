###global Handlebars ###
###global mainJade ###

console.log 'NAME'

$ ->
  console.log '$'
  locale = false
  
  console.log 'Setting up locale'
  $.getJSON 'api/locale', (data) ->
    locale = data
    data = {name: locale.global.title, description: locale.global.description}

    console.log 'Reading main template'
    mainHbr = Handlebars.templates['mainHbr']

    console.log 'Replacing html for #mainHbr'
    $('#mainHbr').html mainHbr(data)

    console.log 'Replacing #mainJade with jade main template'
    $('#mainJade').html mainJade(data)

    util= require 'util'
    console.log 'app: ' + util.test()

    core = require 'core'
    core.alert locale.global.title

