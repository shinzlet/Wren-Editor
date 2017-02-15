const $ = require('jQuery')
const selectionMargin = 100

let clickMonitor = 0
let pixelSize = 10
let spriteWidth = 1, spriteHeight = 1
let pageID = 0
let colors = ["#f00", "#00f", "#00A04A", "#ff0", "#000", "#333", "#777", "#fff"]

$(document).ready(function() {
  let tabNames = ["sketch", "import", "export", "config"];

  for(let i = 0; i < tabNames.length; i++) {
    $("#tabs").append(`<div class="tab" id="${i}"><p>${tabNames[i]}</p></div>`)
  }

  $(".color-selector").each((index) => {
    $($(".color-selector").get(index)).css({backgroundColor: colors[$($(".color-selector").get(index)).data("col")]})
  })

  $("#create-document-button").on('click', () => {
    if(setupValid()) {
      $("#left-panel").animate({width: "0px", opacity: "0"})
      runPixelSetup()
      $("#right-panel").animate({width: "100%", opacity: "1"})
    }
  })

  $(".color-selector").on('click', () => {
    var color = ($(event.target).data("col") + 1) % colors.length
    $(event.target).data("col", color).css({backgroundColor: colors[color]})
  })

  $(".tab").first().toggleClass("active", true).children().css({marginLeft: `${selectionMargin}px`})

  $(".tab").on('click', () => {
    var target
    if($(event.target).hasClass("tab"))  target = event.target
    else target = $(event.target).parent()

    $(".active").toggleClass("active", false).children().stop().animate({marginLeft: "20px"}, 'fast')
    $(target).toggleClass("active", true).children().stop().animate({marginLeft: `${selectionMargin}px`}, 'fast')
    if(pageID == $(target).attr('id')) return
    pageID = $(target).attr('id')
    $("#content-window").stop().animate({marginTop: `${-100 * pageID}vh`})
  })

  // Recreation is key
  $("body").on('click', () => {
    clickMonitor ++;
  })

  window.setInterval(() => {
    if(clickMonitor > 8) alert("dude chill")
    clickMonitor = 0;
  }, 1000)
})

function runPixelSetup() {
  spriteWidth = $("#width").val()
  spriteHeight = $("#height").val()
  var c0 = $($(".color-selector").get(0)).data("col"),
      c1 = $($(".color-selector").get(1)).data("col")

   $($(".color-selector").get(2)).data("col", c0)
   $($(".color-selector").get(3)).data("col", c1)
   $(".color-selector").each((index) => {
     $($(".color-selector").get(index)).css({backgroundColor: colors[$($(".color-selector").get(index)).data("col")]})
   })

  // Create pixel blocks in sketch
  for(let h = 0; h < spriteWidth * spriteHeight; h++) {
    $("#pixel-wrapper").append(`<div class="pixel-block" data-col0="${c0}" data-col1="${c1}"></div>`)
    for(let i = 0; i < 25; i++) {
      $(".pixel-block").last().append('<div class="pixel" data-state="0"></div>')
    }
  }

  maintainPixelBlocks()
  pushColorScheme()

  $(".pixel").on('mousedown', () => {
    switch (event.which) {
      case 1:
        $(event.target).data("state", $(event.target).data("state") == 0 ? 1 : 0)
        pushColorScheme($(event.target).parent())
        break;

      case 3:
        var c0 = $($(".color-selector").get(2)).data("col"),
            c1 = $($(".color-selector").get(3)).data("col")
        $(event.target).parent().data({"col0": c0, "col1": c1})
        pushColorScheme()
        break;

      default:
        break;
    }
  })

  $(".pixel").bind('mousewheel', (e) => {
      let delta = (e.originalEvent.wheelDelta) > 0 ? 1 : -1
      if(pixelSize + delta < 3 ||
          (delta > 0 && (5 * spriteWidth * pixelSize > $("#panel-lower").width() - 50 ||
          5 * spriteHeight * pixelSize > $("#panel-lower").height() - 100))) return

      $(".pixel").css({width: `${pixelSize+=delta}px`, height: `${pixelSize}px`})
      maintainPixelBlocks()
  })

  window.onresize = () => {
    let width = window.innerWidth,
        height = window.innerHeight

    if (5 * spriteWidth * pixelSize + 20 > $("#panel-lower").width() - 50 ||
        5 * spriteHeight * pixelSize + 20 > $("#panel-lower").height() - 100) {
      $(".pixel").stop().animate({width: `${pixelSize -= 5}px`, height: `${pixelSize}px`}, 'fast') // This should be css()
      maintainPixelBlocks()
    }
  }
}

function setupValid() {
  var flag = true
  $("#new-document-wrapper input").each((index, element) => {
    if(!$(element).val() || isNaN($(element).val()) || $(element).val() > 10) flag = false
  })
  console.log(flag)
  return flag
}

function pushColorScheme(el) {
  if(el) {
    let c0 = colors[$(el).data("col0")], c1 = colors[$(el).data("col1")]
    let px = $(el).children()

    for(var j = 0; j < px.length; j++) {
      if($(px[j]).data("state") == 0) {
        $(px[j]).css({backgroundColor: c0})
      } else {
        $(px[j]).css({backgroundColor: c1})
      }
    }
  } else {
    for(var i = 0; i < spriteWidth * spriteHeight; i++) {
      let el = $(".pixel-block").get(i), px = $(el).children()
      let c0 = colors[$(el).data("col0")], c1 = colors[$(el).data("col1")]

      for(var j = 0; j < px.length; j++) {
        if($(px[j]).data("state") == 0) {
          $(px[j]).css({backgroundColor: c0})
        } else {
          $(px[j]).css({backgroundColor: c1})
        }
      }
    }
  }
}

function maintainPixelBlocks() {
  $(".pixel-block").css({width: `${pixelSize*5}px`, height: `${pixelSize*5}px`})
  $("#pixel-wrapper").css({width: `${pixelSize*5*spriteWidth}px`, height: `${pixelSize*5*spriteHeight}px`})
}
