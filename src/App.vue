<template>
  <v-app>
    <v-content>
      <div class="viewport_wrapper">
        <!-- <div class="display-2">Guessing her mind</div> -->

        <div class="mask_phone">
          <div class="main_wrapper">
            <div class="status_bar">{{ timestamp }}</div>
            <div class="header">친구</div>
            <div class="my_profile">
              <div class="my_avatar" />
              <div class="my_info">
                <div class="my_name">김박사</div>
                <div class="my_status">Lab Apocalypse</div>
              </div>
            </div>
            <div class="divider" />
            <div class="friends_header">친구 1</div>
            <div class="friend_profile" @click="openSheet">
              <div class="friend_avatar" />
              <div class="friend_info">
                <div class="friend_name">고양휘</div>
                <div class="friend_status">클릭해서 시작하세요!</div>
              </div>
            </div>
            <div class="footer">CS372 Team 11</div>
            <div class="sheet_profile" v-bind:class="{ activated: open }">
              <div class="status_bar white-text">{{ timestamp }}</div>
              <div class="profile_close">
                <v-btn icon color="white" @click="closeSheet">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </div>
              <div class="profile_avatar" />

              <div class="profile_name">고양휘</div>
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
                <div class="profile_analysis" @click="showGuide">
                  <v-icon color="#e9e9e9">mdi-file-document-outline</v-icon>
                  <span class="mt-2 profile_analysis_desc">가이드</span>
                </div>
                <div class="profile_analysis" @click="insertSample">
                  <v-icon color="#e9e9e9">mdi-lightbulb</v-icon>
                  <span class="mt-2 profile_analysis_desc">예시입력</span>
                </div>
                <div class="profile_analysis" @click="doAnalysis">
                  <v-icon color="#e9e9e9">mdi-magnify</v-icon>
                  <span class="mt-2 profile_analysis_desc">분석하기</span>
                </div>
              </div>
              <v-dialog v-model="guide">
                <v-card>
                  <v-card-title class="headline lighten-2" primary-title>가이드</v-card-title>

                  <v-card-text>
                    <p>입력 란에 분석하고 싶은 초성을 입력하세요!</p>
                    <p>ex ) 내가 너 많이 좋아해! -> ㄴㄱ ㄴ ㅁㅇ ㅈㅇㅎ!</p>
                    <br />
                    <p>-유의 사항-</p>

                    <li>입력 가능한 문자는 한국어 초성, 한국어 글자, 공백 및 특수기호 입니다.</li>
                    <li>입력 가능한 특수기호 : !@#$%^&*)(+=._-</li>
                    <li>영어는 입력할 수 없습니다.</li>
                  </v-card-text>

                  <v-divider></v-divider>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="guide = false">닫기</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </div>
            <div class="analysis_chat" v-bind:class="{ opened : analysis}">
              <div class="status_bar">{{ timestamp }}</div>
              <div class="chat_header">
                <v-btn icon @click="closeAnalysis">
                  <v-icon>mdi-chevron-left</v-icon>
                </v-btn>
                <div class="chat_header_name">고양휘</div>
              </div>
              <div class="chat_my_msg">
                <div class="chat_meta">
                  <div class="read_number">{{analysisDone ? "" : "1"}}</div>
                  <div class="timestamp">{{analysisTime}}</div>
                </div>
                <div class="chat_my_msg_bubble my_msg_first">양휘야, 혹시 {{ consonants }} 가 무슨 의미야?</div>
              </div>
              <div class="chat_cat_msg" v-if="showFirst">
                <div class="chat_cat_avatar" />
                <div class="chat_cat_msg_bubble cat_msg_first">
                  아 그건 말야
                  <div class="chat_cat_name">고양휘</div>
                </div>
                <div class="chat_cat_meta" v-if="current == 'first'">
                  <div class="timestamp">{{analysisTime}}</div>
                </div>
              </div>
              <div class="chat_cat_msg" v-if="showSecond">
                <div class="chat_cat_msg_bubble">{{analysisResult}}</div>
                <div class="chat_cat_meta" v-if="current == 'second'">
                  <div class="timestamp">{{analysisTime}}</div>
                </div>
              </div>
              <div class="chat_cat_msg" v-if="showThird">
                <div class="chat_cat_msg_bubble">라는 뜻 이야!</div>
                <div class="chat_cat_meta" v-if="current == 'third'">
                  <div class="timestamp">{{analysisTime}}</div>
                </div>
              </div>
              <v-fab-transition>
                <div class="chat_footer" v-if="showThird">
                  도움 됐길 바라요!
                  <v-btn class="mt-2" color="white" @click="closeAnalysis">돌아가기</v-btn>
                </div>
              </v-fab-transition>
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
      required: value => !!value || "최소 한 글자 이상 입력해주세요.",
      kor: value => {
        const pattern = /^[\u3131-\uD79D0-9!@#$%^&*)(+=._-\s]+$/;
        return pattern.test(value) || "허용되지 않는 입력 값입니다.";
      }
    },
    guide: false,
    sample: "ㄴㄱ ㄴ ㅁㅇ ㅈㅎㅇ!",
    analysis: false,
    analysisTime: null,
    analysisResult: null,
    analysisDone: false,
    showFirst: false,
    showSecond: false,
    showThird: false,
    current: null
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
    showGuide() {
      this.guide = true;
    },
    insertSample() {
      this.consonants = this.sample;
    },
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    async doAnalysis() {
      if (!this.consonants || this.consonants.trim().length == 0) {
        alert("최소 한 글자 이상 입력해주세요.");
        return;
      }

      const pattern = /^[\u3131-\uD79D0-9!@#$%^&*)(+=._-\s]+$/;
      if (!pattern.test(this.consonants)) {
        alert("허용되지 않는 입력 값입니다.");
        return;
      }

      const today = new Date();
      let time = today.getHours() + ":";
      if (today.getMinutes() < 10) {
        time += "0";
      }
      time += today.getMinutes();
      this.analysisTime = time;
      this.analysis = true;

      //API call
      await this.sleep(2000);

      this.analysisResult = "내가 너 많이 좋아해!";
      this.analysisDone = true;

      await this.sleep(1500);
      this.current = "first";
      this.showFirst = true;
      await this.sleep(1500);
      this.current = "second";
      this.showSecond = true;
      await this.sleep(1500);
      this.current = "third";
      this.showThird = true;
    },
    closeAnalysis() {
      this.analysis = false;
      this.open = false;
      this.analysisTime = null;
      this.consonants = null;
      this.showFirst = false;
      this.showSecond = false;
      this.showThird = false;
      this.current = null;
      this.analysisResult = null;
    }
  }
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
  width: 800px;
  height: 800px;
  background-image: url("assets/iphone_prortrait.png");
  background-size: contain;
  background-position: center center;
  position: relative;
}

.main_wrapper {
  width: 300px;
  height: 600px;
  display: flex;
  flex-direction: column;
  position: absolute;
  background: white;
  bottom: 177px;
  left: 20px;
  border-radius: 10px;
}

.status_bar {
  width: 100%;
  padding: 10px 15px;
  font-size: 12px;
  font-weight: 600;
}

.header {
  padding: 10px 15px;
  font-size: 24px;
  font-weight: bold;
}

.my_profile {
  padding: 10px 15px;
  display: flex;
  align-items: center;
}

.my_avatar {
  height: 60px;
  width: 60px;
  border-radius: 25px;
  background: url("assets/default_avatar.jpeg");
  background-size: cover;
}

.my_info {
  padding: 10px 15px;
  display: flex;
  flex-direction: column;
}

.my_name {
  font-size: 18px;
  font-weight: bold;
}

.my_status {
  margin-top: 5px;
  font-size: 12px;
  color: #a9a9a9;
}

.divider {
  width: calc(100% - 20px);
  margin: 5px auto;
  height: 1px;
  background: #f9f9f9;
}

.friends_header {
  padding: 10px 15px;
  color: #898989;
  font-size: 5px;
}

.friend_profile {
  padding: 10px 15px;
  display: flex;
  align-items: center;
}

.friend_profile:hover {
  background: #f9f9f9;
}

.friend_avatar {
  height: 40px;
  width: 40px;
  border-radius: 15px;
  background: url("assets/cat.jpeg");
  background-size: cover;
}

.friend_info {
  padding: 0px 15px;
  display: flex;
  flex-direction: column;
}

.friend_name {
  font-size: 14px;
  font-weight: 500;
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
  margin-right: auto;
  margin-left: 5px;
}

.profile_name {
  margin-top: 5px;
  font-size: 14px;
  font-weight: bold;
  color: white;
}

.profile_status {
  width: 200px;
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
  justify-content: space-around;
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

.white-text {
  color: white;
}

@media only screen and (max-width: 600px) {
  .viewport_wrapper {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: none;
    z-index: -1;
  }

  .mask_phone {
    width: 100%;
    height: 100%;
    display: flex;
    background: none;
  }

  .main_wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: white;
    bottom: 0;
    left: 0;
  }

  .sheet_profile {
    position: absolute;
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
      url("assets/me_no_cat.jpg");
    background-size: cover;
    background-position: center center;
    width: 100%;
    height: 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    left: 0px;
    bottom: 0px;
    border-radius: 0%;
    transition: 0.3s ease-in-out;
    overflow: hidden;
  }

  .activated {
    height: 100%;
    transition: 0.3s ease-in-out;
  }

  .profile_avatar {
    margin-top: auto;
    height: 100px;
    width: 100px;
    border-radius: 38px;
    background: url("assets/cat.jpeg");
    background-size: cover;
    position: relative;
  }

  .profile_name {
    margin-top: 10px;
    font-size: 20px;
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
    height: 100px;
    display: flex;
    justify-content: space-around;
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

  .profile_analysis_desc {
    font-size: 14px;
  }

  .analysis_chat {
    position: absolute;
    background: rgb(193, 208, 219);
    width: 0;
    height: 100%;
    right: 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transition: 0.3s ease-in-out;
  }

  .opened {
    width: 100%;
    transition: 0.3s ease-in-out;
  }

  .chat_header {
    width: 100%;
    display: flex;
    align-items: center;
  }

  .chat_header_name {
    height: 100%;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 36px;
    font-weight: bold;
  }

  .chat_my_msg {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }

  .chat_meta {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
    font-size: 8px;
  }

  .timestamp {
    color: #898989;
  }

  .read_number {
    color: #fbe44c;
    font-weight: bold;
    margin-bottom: -2px;
  }

  .chat_my_msg_bubble {
    background: #fbe44c;
    max-width: 70%;
    padding: 8px;
    border-radius: 10px;
    position: relative;
    margin-left: 5px;
    margin-right: 15px;
    font-size: 12px;
    margin-top: 10px;
  }
  .my_msg_first:after {
    content: "";
    position: absolute;
    right: 0;
    top: 10%;
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-left-color: #fbe44c;
    border-right: 0;
    border-top: 0;
    margin-right: -5px;
  }

  .chat_cat_msg {
    width: 100%;
    display: flex;
    padding-left: 10px;
    margin-top: 10px;
  }

  .chat_cat_meta {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    font-size: 8px;
    margin-left: 5px;
  }

  .chat_cat_name {
    position: absolute;
    top: -20px;
    left: 0;
    color: #898989;
    font-size: 12px;
  }

  .chat_cat_avatar {
    height: 30px;
    width: 30px;
    border-radius: 12px;
    background: url("assets/cat.jpeg");
    background-size: cover;
  }

  .chat_cat_msg_bubble {
    background: white;
    max-width: 70%;
    padding: 8px;
    border-radius: 10px;
    position: relative;
    margin-left: 45px;
    font-size: 12px;
    margin-top: -5px;
  }

  .cat_msg_first {
    margin-top: 20px;
    margin-left: 15px;
  }

  .cat_msg_first:after {
    content: "";
    position: absolute;
    left: 0;
    top: 10%;
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-right-color: white;
    border-left: 0;
    border-top: 0;
    margin-left: -5px;
  }

  .chat_footer {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: auto;
    margin-bottom: 20px;
    font-size: 14px;
    color: #898989;
  }
}
</style>
