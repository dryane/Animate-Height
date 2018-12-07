var animateHeight = function(options){

    var root = this;
    root.vars = {
        el  : null,
        open : false,
        class : "",
        animationTiming : null,
        animationEasing : null
    };
    root.height = null;

    var construct = function(options){
        jQuery.extend(root.vars , options);
    };
    var init = function(){
        if (root.vars.class != "") {
            root.vars.class = ' class="' + root.vars.class + '"';
        }
        jQuery(root.vars.el).contents().wrapAll('<div' + root.vars.class + '/>');
        root.height = jQuery(root.vars.el).children().outerHeight();

        if( jQuery(root.vars.el).css('overflow').toLowerCase() != 'hidden') {
            jQuery(root.vars.el).css("overflow", "hidden");
        }
        if (root.vars.animationTiming != null && root.vars.animationEasing != null) {
            var animation = "max-height " + root.vars.animationTiming + "ms " + root.vars.animationEasing;
            jQuery(root.vars.el).css("transition", animation);
        }

        if (root.vars.open == true) {
            maxHeight(root.height);
            root.vars.open = true;
        } else {
            maxHeight(0);
            root.vars.open = false;
        }
    };
 
    this.open = function(){
        root.height = jQuery(root.vars.el).children().outerHeight();  
        maxHeight(root.height);
    };
 
    this.close = function(){
        maxHeight(0);
    };
 
    this.toggle = function(){
        root.height = jQuery(root.vars.el).children().outerHeight();  
        if (root.vars.open) {
            maxHeight(0);
        } else {
            maxHeight(root.height);
        }
    };

    var maxHeight = function(height) {
        if (height) {
            root.vars.open = true;
        } else {
            root.vars.open = false;
        }
        jQuery(root.vars.el).css("max-height", height + "px");
    }
    var resize = function() {
        root.height = jQuery(root.vars.el).children().outerHeight();  
        var height = root.height;
        if (root.vars.open) {
            jQuery(root.vars.el).css("max-height", height + "px");
        }
    }

    construct(options);
    init();

    window.addEventListener('resize', resize);
 
};
