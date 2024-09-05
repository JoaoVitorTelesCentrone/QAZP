﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using ZventsApi.Models;

#nullable disable

namespace ZventsApi.Migrations
{
    [DbContext(typeof(ZventsDbContext))]
    partial class ZventsDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "8.0.3");

            modelBuilder.Entity("ZventsApi.Models.Client", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<string>("AddressComplement")
                        .HasColumnType("TEXT");

                    b.Property<string>("AddressName")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("AddressNumber")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("City")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("TEXT");

                    b.Property<string>("District")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("DocumentId")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Email")
                        .HasColumnType("TEXT");

                    b.Property<string>("FullName")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<bool?>("IsDeleted")
                        .HasColumnType("INTEGER");

                    b.Property<string>("PhoneNumber")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("State")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("ZipCode")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Clients");
                });

            modelBuilder.Entity("ZventsApi.Models.Event", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<string>("AddressComplement")
                        .HasColumnType("TEXT");

                    b.Property<string>("AddressName")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("AddressNumber")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("City")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<Guid>("ClientId")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("TEXT");

                    b.Property<string>("District")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<DateOnly>("EndDate")
                        .HasColumnType("TEXT");

                    b.Property<TimeOnly>("EndTime")
                        .HasColumnType("TEXT");

                    b.Property<int?>("EstimatedAudience")
                        .HasColumnType("INTEGER");

                    b.Property<bool?>("IsDeleted")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<DateOnly>("StartDate")
                        .HasColumnType("TEXT");

                    b.Property<TimeOnly>("StartTime")
                        .HasColumnType("TEXT");

                    b.Property<string>("State")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("Status")
                        .HasColumnType("INTEGER");

                    b.Property<decimal?>("TotalAmount")
                        .HasColumnType("TEXT");

                    b.Property<int>("Type")
                        .HasColumnType("INTEGER");

                    b.Property<string>("ZipCode")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("ClientId");

                    b.ToTable("Events");
                });

            modelBuilder.Entity("ZventsApi.Models.EventMaterial", b =>
                {
                    b.Property<Guid>("EventId")
                        .HasColumnType("TEXT");

                    b.Property<Guid>("MaterialId")
                        .HasColumnType("TEXT");

                    b.Property<int>("Quantity")
                        .HasColumnType("INTEGER");

                    b.HasKey("EventId", "MaterialId");

                    b.HasIndex("MaterialId");

                    b.ToTable("EventMaterials");
                });

            modelBuilder.Entity("ZventsApi.Models.Material", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<int>("Category")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("TEXT");

                    b.Property<bool?>("IsDeleted")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<decimal>("Price")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Materials");
                });

            modelBuilder.Entity("ZventsApi.Models.Quote", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("TEXT");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("EstimatedAudience")
                        .HasColumnType("INTEGER");

                    b.Property<string>("EventType")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("FullName")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("INTEGER");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Quotes");
                });

            modelBuilder.Entity("ZventsApi.Models.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("TEXT");

                    b.Property<bool?>("IsDeleted")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int?>("Role")
                        .HasColumnType("INTEGER");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("UserStatus")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("ZventsApi.Models.Event", b =>
                {
                    b.HasOne("ZventsApi.Models.Client", "Client")
                        .WithMany()
                        .HasForeignKey("ClientId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Client");
                });

            modelBuilder.Entity("ZventsApi.Models.EventMaterial", b =>
                {
                    b.HasOne("ZventsApi.Models.Event", "Event")
                        .WithMany("EventMaterials")
                        .HasForeignKey("EventId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ZventsApi.Models.Material", "Material")
                        .WithMany("EventMaterials")
                        .HasForeignKey("MaterialId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Event");

                    b.Navigation("Material");
                });

            modelBuilder.Entity("ZventsApi.Models.Event", b =>
                {
                    b.Navigation("EventMaterials");
                });

            modelBuilder.Entity("ZventsApi.Models.Material", b =>
                {
                    b.Navigation("EventMaterials");
                });
#pragma warning restore 612, 618
        }
    }
}
