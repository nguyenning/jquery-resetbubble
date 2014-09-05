(function (jQuery) {

  // if the browser doesn't support submitBubbles, then the browser
  // does not support reset bubbles
  if (!jQuery.support.submitBubbles) {

    jQuery.event.special.reset = {
      setup: function() {
        // Only need this for delegated form reset events
        if ( jQuery.nodeName( this, 'form' ) ) {
          return false;
        }

        // Lazy-add a reset handler when a descendant form may potentially be
        // reset
        jQuery.event.add( this, 'click._reset keypress._reset', function( e ) {
          // Node name check avoids a VML-related crash in IE (#9807)
          var elem = e.target,
            form = jQuery.nodeName( elem, 'input' ) ||
              jQuery.nodeName( elem, 'button' ) ? elem.form : undefined;
          if ( form && !jQuery._data( form, 'resetBubbles' ) ) {
            jQuery.event.add( form, 'reset._reset', function( event ) {
              event._reset_bubble = true;
            });
            jQuery._data( form, 'resetBubbles', true );
          }
        });
        // return undefined since we don't need an event listener
      },

      postDispatch: function( event ) {
        // If form was reset by the user, bubble the event up the tree
        if ( event._reset_bubble ) {
          delete event._reset_bubble;
          if ( this.parentNode && !event.isTrigger ) {
            jQuery.event.simulate( 'reset', this.parentNode, event, true );
          }
        }
      },

      teardown: function() {
        // Only need this for delegated form reset events
        if ( jQuery.nodeName( this, 'form' ) ) {
          return false;
        }

        // Remove delegated handlers; cleanData eventually reaps reset handlers
        // attached above
        jQuery.event.remove( this, '._reset' );
      }
    };
  }
}(jQuery));
