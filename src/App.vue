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
            <div class="friend_profile">
              <div class="friend_avatar" />
              <div class="friend_info">
                <div class="friend_name">
                  고양휘
                </div>
                <div class="friend_status">
                  Click me to begin!
                </div>
              </div>
            </div>
            <div class="footer">
              CS372 Team 10
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
</style>
