$(function () {
    'use strict';

    //tab切り替え
    $('.tab li').on('click', function () {
        var index = $('.tab li').index(this);

        $('.content li').css('display', 'none');

        $('.content li').eq(index).css('display', 'block');

        $('.tab li').removeClass('select');

        $(this).addClass('select');
    })

    //五十音検索スクロール処理
    $('#select_a').on('click', function() {
      $("html,body").animate({scrollTop:$('#aline').offset().top-70});
    })
    $('#select_k').on('click', function() {
      $("html,body").animate({scrollTop:$('#kline').offset().top-70});
    })
    $('#select_s').on('click', function() {
      $("html,body").animate({scrollTop:$('#sline').offset().top-70});
    })
    $('#select_t').on('click', function() {
      $("html,body").animate({scrollTop:$('#tline').offset().top-70});
    })
    $('#select_n').on('click', function() {
      $("html,body").animate({scrollTop:$('#nline').offset().top-70});
    })
    $('#select_h').on('click', function() {
      $("html,body").animate({scrollTop:$('#hline').offset().top-70});
    })
    $('#select_m').on('click', function() {
      $("html,body").animate({scrollTop:$('#mline').offset().top-70});
    })
    $('#select_y').on('click', function() {
      $("html,body").animate({scrollTop:$('#yline').offset().top-70});
    })
    $('#select_r').on('click', function() {
      $("html,body").animate({scrollTop:$('#rline').offset().top-70});
    })
    $('#select_w').on('click', function() {
      $("html,body").animate({scrollTop:$('#wline').offset().top-70});
    })

    //診療科選択時
    $('.department').on('click', function() {
      var id = $(this).attr('id');
      location.href = 'index.html?id=' + id;
    })


})
