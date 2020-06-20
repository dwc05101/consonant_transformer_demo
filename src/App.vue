<template>
  <v-app>
    <v-content>
      <div class="viewport_wrapper">
        <!-- <div class="display-2">Guessing her mind</div> -->

        <div class="mask_phone">
          <div class="main_wrapper">
            <div class="status_bar">{{ timestamp }}</div>
            <div class="header">
              친구
            </div>
            <div class="my_profile">
              <div class="my_avatar" />
              <div class="my_info">
                <div class="my_name">
                  김박사
                </div>
                <div class="my_status">
                  Lab Apocalypse
                </div>
              </div>
            </div>
            <div class="divider" />
            <div class="friends_header">
              친구 1
            </div>
            <div class="friend_profile" @click="openSheet">
              <div class="friend_avatar" />
              <div class="friend_info">
                <div class="friend_name">
                  고양휘
                </div>
                <div class="friend_status">
                  클릭해서 시작하세요!
                </div>
              </div>
            </div>
            <div class="footer">
              CS372 Team 11
            </div>
            <div class="sheet_profile" v-bind:class="{ activated: open }">
              <div class="profile_close">
                <v-btn icon color="white" @click="closeSheet">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </div>
              <div class="profile_avatar" />

              <div class="profile_name">
                고양휘
              </div>
              <div class="profile_status">
                <v-text-field
                  v-model="consonants"
                  class="profile_status"
                  dark
                  color="white"
                  dense
                  counter
                  maxlength="90"
                  placeholder="초성을 입력하세요."
                  :rules="[rules.required, rules.kor]"
                ></v-text-field>
              </div>

              <div class="profile_divider"></div>
              <div class="profile_action">
                <div class="profile_analysis">
                  <v-icon color="#e9e9e9">mdi-magnify</v-icon>
                  <span>분석하기</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  computed: {},

  data: () => ({
    timestamp: "",
    open: false,
    consonants: "",
    rules: {
      required: (value) => !!value || "최소 한 글자 이상 입력해주세요.",
      kor: (value) => {
        const pattern = /^[\u3131-\uD79D]+$/;
        return pattern.test(value) || "한국어 입력만 가능합니다.";
      },
    },
  }),

  created() {
    setInterval(this.getNow, 1000);
  },

  methods: {
    getNow() {
      const today = new Date();
      let time = today.getHours() + ":";
      if (today.getMinutes() < 10) {
        time += "0";
      }
      time += today.getMinutes();
      this.timestamp = time;
    },
    openSheet() {
      this.open = true;
      setTimeout(() => {
        this.bgLoad = true;
      }, 1000);
    },
    closeSheet() {
      this.open = false;
    },
  },
};
</script>

<style>
.viewport_wrapper {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url("assets/cafe_background.jpg");
  background-size: cover;
  background-position: center center;
  z-index: -1;
}

.mask_phone {
  margin-top: auto;
  width: 600px;
  height: 600px;
  background-image: url("assets/iphone_prortrait.png");
  background-size: contain;
  background-position: center center;
  position: relative;
}

.main_wrapper {
  width: 221px;
  height: 442px;
  display: flex;
  flex-direction: column;
  position: absolute;
  background: white;
  bottom: 132px;
  left: 156px;
  border-radius: 10px;
}

.status_bar {
  width: 100%;
  height: 25px;
  padding: 5px 10px;
  font-size: 5px;
}

.header {
  padding: 5px 10px;
  font-weight: bold;
}

.my_profile {
  padding: 5px 10px;
  display: flex;
  align-items: center;
}

.my_avatar {
  height: 45px;
  width: 45px;
  border-radius: 20px;
  background: url("assets/default_avatar.jpeg");
  background-size: cover;
}

.my_info {
  padding: 5px 10px;
  display: flex;
  flex-direction: column;
}

.my_name {
  font-size: 14px;
  font-weight: bold;
}

.my_status {
  font-size: 10px;
  color: #a9a9a9;
}

.divider {
  width: calc(100% - 20px);
  margin: 5px auto;
  height: 1px;
  background: #f9f9f9;
}

.friends_header {
  padding: 5px 10px;
  color: #898989;
  font-size: 5px;
}

.friend_profile {
  padding: 5px 10px;
  display: flex;
  align-items: center;
}

.friend_profile:hover {
  background: #f9f9f9;
}

.friend_avatar {
  height: 30px;
  width: 30px;
  border-radius: 12px;
  background: url("assets/cat.jpeg");
  background-size: cover;
}

.friend_info {
  padding: 0px 10px;
  display: flex;
  flex-direction: column;
}

.friend_name {
  font-size: 12px;
}

.friend_status {
  font-size: 8px;
  color: #a9a9a9;
}

.footer {
  margin-top: auto;
  width: 100%;
  height: 40px;
  background: #f9f9f9;
  border-radius: 0 0 10px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  color: #a9a9a9;
}

.sheet_profile {
  position: absolute;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("assets/me_no_cat.jpg");
  background-size: cover;
  background-position: center center;
  width: 223px;
  height: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  left: -1px;
  bottom: -1px;
  border-radius: 10px;
  transition: 0.3s ease-in-out;
  overflow: hidden;
}

.activated {
  height: 444px;
  transition: 0.3s ease-in-out;
}

.profile_avatar {
  margin-top: auto;
  height: 60px;
  width: 60px;
  border-radius: 25px;
  background: url("assets/cat.jpeg");
  background-size: cover;
  position: relative;
}

.profile_close {
  position: absolute;
  top: 5px;
  right: 5px;
}

.profile_name {
  margin-top: 5px;
  font-size: 14px;
  font-weight: bold;
  color: white;
}

.profile_status {
  font-size: 8px;
  color: white;
}

.profile_divider {
  margin-top: 15px;
  height: 1px;
  width: 100%;
  background: #b9b9b9;
}

.profile_action {
  width: 100%;
  height: 75px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.profile_analysis {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #e9e9e9;
  font-size: 10px;
}
</style>
