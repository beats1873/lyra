import { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } from 'discord.js';
import { getSettings, updateSettings } from '../../utils/settings.js';

export default {
  data: new SlashCommandBuilder()
    .setName('setmodrole')
    .setDescription('Add a moderator role for this server.')
    .addRoleOption(option =>
      option
        .setName('role')
        .setDescription('The role to add as a moderator')
        .setRequired(true)
    )
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const role = interaction.options.getRole('role');
    const settings = await getSettings(interaction.guildId);
    const currentRoles = settings.modRoles || [];

    if (currentRoles.includes(role.id)) {
      const warnEmbed = new EmbedBuilder()
        .setColor(0xFFA500)
        .setTitle('Role Already Added')
        .setDescription(`⚠️ **${role.name}** is already a moderator role.`);

      return interaction.reply({
        embeds: [warnEmbed],
        flags: 64
      });
    }

    await updateSettings(interaction.guildId, {
      modRoles: [...currentRoles, role.id]
    });

    const successEmbed = new EmbedBuilder()
      .setColor(0x00FF88)
      .setTitle('Moderator Role Added')
      .setDescription(`✅ Added **${role.name}** to the list of moderator roles.`);

    await interaction.reply({
      embeds: [successEmbed],
      flags: 64
    });
  }
};
