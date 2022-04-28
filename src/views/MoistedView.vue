<template>
  <div id="moisted">
    <Header title="Kalkulaatoriga seotud mõistete seletused" />
    <p><strong>Geograafiline laius -</strong> Suurus, mis iseloomustab nurkkaugust ekvaatorist. Pikkus muutub põhjast(90)-lõunasse(-90).</p>
    <p><strong>Geograafiline pikkus -</strong> Suurus, mis iseloomustab nurkkaugust algmeridiaanist. Pikkus muutub idast(180)-läände(-180). </p>
    <p><strong>Astronoomiline öö -</strong>  Algab kui päike langeb 18 kraadi horisondist allapoole ja lõppeb kui päike on sellest piirist kõrgemal.</p>
    <p><strong>Horisondi suhtes öö -</strong> Algab kui päikese ülemine tipp kaob horisondi taha ja lõppeb kui päikese ülemine tipp hakkab horisondi tagant paistma.</p>
    <p><strong>Terminaator joon -</strong>  Joon, mis eraldab päikesevalgusega osa planeedist pimedast osast.</p>
  </div>
</template>
<script>
import Header from '../components/Header.vue'
export default {
  components:{
    Header,
  }
}
</script>
<style>
#moisted{
  padding-left: 1%;
}
</style>