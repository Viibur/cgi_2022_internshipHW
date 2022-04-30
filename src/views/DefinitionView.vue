<template>
  <div class="definitions">
    <Header title="Kalkulaatoriga seotud mõistete seletused" />
    <p><b>Geograafiline laius -</b> Suurus, mis iseloomustab nurkkaugust ekvaatorist. Pikkus muutub põhjast(90)-lõunasse(-90).</p>
    <p><b>Geograafiline pikkus -</b> Suurus, mis iseloomustab nurkkaugust algmeridiaanist. Pikkus muutub idast(180)-läände(-180). </p>
    <p><b>Astronoomiline öö -</b>  Algab kui päike langeb 18 kraadi horisondist allapoole ja lõppeb kui päike on sellest piirist kõrgemal.</p>
    <p><b>Horisondi suhtes öö -</b> Algab kui päikese ülemine tipp kaob horisondi taha ja lõppeb kui päikese ülemine tipp hakkab horisondi tagant paistma.</p>
    <p><b>Terminaator joon -</b>  Joon, mis eraldab päikesevalgusega osa planeedist pimedast osast.</p>
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
.definitions{
  padding-left: 1rem;
}
</style>