export class DomListener {
 constructor($root) {
   if(!$root) {
     throw new Error(`no $root provided for DOM`)
   }
   this.$root = $root;
 } 
}