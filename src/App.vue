<template>
  <div id="app">
    <Contact></Contact>
  </div>
</template>

<script>
import Contact from "./components/Contact";
export default {
  name: "App",
  data() {
    return {
      title: "Hello Vue",
      name: "Vasya",
      surname: "Ivanov",
      middleName: "Ivanovich",
      type: "Manager"
    };
  },
  components: {
    Contact
  }
};
</script>