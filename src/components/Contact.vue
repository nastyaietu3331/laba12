<template>
  <div>
    <div class="inputContacts">
      <h1 v-if="this.errorMsg" class="error">{{errorMsg}}</h1>
      <div class="nameContact item">
        <h1>Имя</h1>
        <input type="text" name="name" id="name" v-model="contact.name" />
      </div>
      <div class="surnameContact item">
        <h1>Фамилия</h1>
        <input type="text" name="surname" id="surname" v-model="contact.surname" />
      </div>
      <div class="middleNameContact item">
        <h1>Отчество</h1>
        <input type="text" name="middleName" id="middleName" v-model="contact.middleName" />
      </div>
      <div class="numberContact item">
        <h1>Номер</h1>
        <input type="number" name="number" id="number" v-model="contact.number" />
      </div>
      <div class="featuredContacts">
        <input type="checkbox" name="featured" id="featured" v-model="contact.featured" />
        <label for="featured" class="sortLabel">Избранное</label>
      </div>
      <div class="sorts">
        <div class="sortName">
          <input type="radio" name="sort" id="sortName" v-model="sorts.name" />
          <label for="sort" class="sortLabel">Сортировка по имени</label>
        </div>
        <div class="sortSurname">
          <input type="radio" name="sort" id="sortSurname" v-model="sorts.surname" />
          <label for="sort" class="sortLabel">Сортировка по фамилии</label>
        </div>
      </div>
      <button class="btn" v-on:click="writeContact">Записать</button>
    </div>
    <div class="contacts">
      <h1 v-if="emptyArrFeatured">Избранные контакты</h1>
      <div class="listContacts">
        <ul v-for="(item, index) in featuredItems" :key="index">
          <li>
            ФИО: {{item.surname}} {{item.name}}
            {{item.middleName}}. Номер: {{item.number}}
            <img
              class="deleteImg"
              src="trash.ico"
              alt="delete"
              @click="deleteContact('feature', item.id)"
            />
          </li>
        </ul>
      </div>
      <hr v-if="emptyArrFeatured" />
      <h1 v-if="emptyArrContacts">Контакты</h1>
      <div class="listContacts">
        <ul v-for="(item, index) in contactsItems" :key="index">
          <li>
            ФИО: {{item.surname}} {{item.name}}
            {{item.middleName}}. Номер: {{item.number}}
            <img
              class="deleteImg"
              src="trash.ico"
              alt="delete"
              v-on:click="() => deleteContact('contact', item.id)"
            />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  //   name: "Contact",
  data() {
    return {
      contact: {
        id: 1,
        name: "",
        surname: "",
        middleName: "",
        number: "",
        featured: false
      },
      sorts: {
        name: false,
        surname: false
      },
      featuredItems: [],
      contactsItems: [],
      emptyArrFeatured: false,
      emptyArrContacts: false,
      errorMsg: ""
    };
  },
  methods: {
    writeContact: function() {
      if (
        this.contact.name === "" ||
        this.contact.surname === "" ||
        this.contact.number === "" ||
        this.contact.middleName === ""
      ) {
        this.errorMsg = "Заполните все поля!";
        return;
      } else {
        this.errorMsg = "";
      }
      if (
        this.featuredItems.find(item => item.number == this.contact.number) ===
          undefined &&
        this.contactsItems.find(item => item.number == this.contact.number) ===
          undefined
      ) {
        this.errorMsg = "";
      } else {
        this.errorMsg = "Такой номер уже существует!";
        return;
      }
      if (this.contact.featured == true) {
        this.featuredItems.push({ ...this.contact });
        this.sortContacts();
        this.emptyArrFeatured = true;
      } else {
        this.contactsItems.push({ ...this.contact });
        this.sortContacts();
        this.emptyArrContacts = true;
      }
      this.contact.id++;
    },
    sortContacts: function() {
      if (this.sorts.name) {
        if (this.emptyArrContacts) {
          this.contactsItems.sort((a, b) => (a.name > b.name ? 1 : -1));
        }
        if (this.emptyArrFeatured) {
          this.featuredItems.sort((a, b) => (a.name > b.name ? 1 : -1));
        }
      } else {
        if (this.emptyArrContacts) {
          this.contactsItems.sort((a, b) => (a.surname > b.surname ? 1 : -1));
        }
        if (this.emptyArrFeatured) {
          this.featuredItems.sort((a, b) => (a.surname > b.surname ? 1 : -1));
        }
      }
    },
    deleteContact: function(type, id) {
      if (type === "feature") {
        this.featuredItems = this.featuredItems.filter(item => item.id != id);
        if (this.featuredItems == false) this.emptyArrFeatured = false;
      }
      if (type === "contact") {
        this.contactsItems = this.contactsItems.filter(item => item.id != id);
        if (this.contactsItems == false) this.emptyArrContacts = false;
      }
    }
  }
};
</script>