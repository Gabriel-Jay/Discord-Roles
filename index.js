//Type !send in the chat to send the buttons
import {
  Client as DumbAss,
  Intents,
  Permissions as perms,
  MessageActionRow as row,
  MessageButton as button,
  MessageEmbed as embed,
} from "discord.js";
import pkg from "quick.db";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { get, set } = pkg;
import dotenv from "dotenv";
dotenv.config();
const {
  prefix,
  r1,
} = require("./config.json");
const cool = new DumbAss({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
cool.on("ready", () => {
  console.log("Certification Services Ready"); //korean: 인증 서비스 준비 완료
});
cool.on("messageCreate", async (dude) => {
  if (dude.content == `${prefix}send`) {
    if (!dude.member.permissions.has(perms.FLAGS.ADMINISTRATOR)) {
      dude.channel.send(":X: | Administrator privileges are required to execute this command."); //korean: :X: | 이 명령어를 실행하려면 관리자 권한이 필요합니다.
    }
    if (dude.member.permissions.has(perms.FLAGS.ADMINISTRATOR)) {
      const rw = new row().addComponents(
        new button()
          .setCustomId("r1")
          .setLabel("Certified") //korean: 인증
          .setStyle("SUCCESS")
          .setEmoji('✅'),
      );
      const roles = new embed()
        .setColor(`AQUA`)
        .setFooter(`Write down the sentence to put in the footer.`) //korean: footer에 넣을 문장을 적으시오.
        .setTitle(`Write down the sentence to put in the title.`) //korean: title에 넣을 문장을 적으시오.
        .setDescription(
          `Write down the sentence to put in the descroption.` //korean: descroption에 넣을 문장을 적으시오.
        );
      dude.channel.send({ embeds: [roles], components: [rw] });
    }
  }
});
cool.on("interactionCreate", async (interaction) => {
  if (interaction.isButton()) {
    if (interaction.customId == "r1") {
      if (interaction.member.roles.cache.some((role) => role.id == r1)) {
        interaction.reply({
          content: `Authentication canceled.`, //korean: 인증 취소
          ephemeral: true,
        });
        interaction.member.roles.remove(r1);
      } else {
        interaction.member.roles.add(r1);
        await interaction.reply({
          content: `You have been authenticated.`, //korean: 인증 완료
          ephemeral: true,
        });
      }
    }
  }
});
cool.login(process.env.TOKEN); //korean: env파일 생성 후 TOKEN 값을 입력하시오.
