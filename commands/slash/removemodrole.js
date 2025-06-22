import { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } from 'discord.js';
import { getSettings, updateSettings } from '../../utils/settings.js';

export default {
  data: new SlashCommandBuilder()
    .setName('removemodrole')
    .setDescription('Remove a moderator role.')
    .addRoleOption(option =>
      option
        .setName('role')
        .setDescription('The role to remove from moderator list')
        .setRequired(true)
    )
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const role = interaction.options.getRole('role');
    const settings = await getSettings(interaction.guildId);
    const modRoles = settings.modRoles || [];

    if (!modRoles.includes(role.id)) {
      const warnEmbed = new EmbedBuilder()
        .setColor(0xFFA500)
        .setTitle('Role Not Found')
        .setDescription(`⚠️ **${role.name}** is not currently a moderator role.`);

      return interaction.reply({
        embeds: [warnEmbed],
        flags: 64
      });
    }

    const updatedRoles = modRoles.filter(id => id !== role.id);
    await updateSettings(interaction.guildId, { modRoles: updatedRoles });

    const successEmbed = new EmbedBuilder()
      .setColor(0x00FF88)
      .setTitle('Moderator Role Removed')
      .setDescription(`✅ Removed **${role.name}** from moderator roles.`);

    await interaction.reply({
      embeds: [successEmbed],
      flags: 64
    });
  }
};
