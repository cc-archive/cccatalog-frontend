<template>
  <div class="banner" v-bind:class="{'change':task.id}">
    
    <p class="row">
      If you donate $5 today, and everyone else does the same,
      we can keep growing our database of freely reusable content. For you. For all of us.
      <button
        type="submit"
        class="donate button is-medium"
       v-on:click="redirect"
      >Yes, I’ll donate now</button>
      <button class="label_two button is-small" v-on:click="onclick">Not today</button>
      <button class="button_two button" v-on:click="onclick"><b>x</b></button>
    </p>
  </div>
</template>>


<script>
export default {
    name:"Banner",
  methods: {
    onclick() {
      this.task.id=true
      
    },
    redirect(){
      window.location.href = 'https://www.classy.org/give/297881/#!/donation/checkout';
    }
  },
  data() {
    return {
      task: {
        id:false
      }

      
    }
  },

};
</script>



<style scoped>
.change {
  display:none
  
}
.banner {
 
  background: #e6f6eb;
  
}
.button_two {
   
  background: #e6f6eb;
  border: none;
  }
.donate {
    
  background: #008000;
  color: white;
  border: none;
}
.label_two {
    
  background: #e6f6eb;
  color: #008000;
  border:none
  
 
  
 }
</style>
