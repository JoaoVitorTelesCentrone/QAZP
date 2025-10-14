CREATE OR ALTER PROCEDURE InsertMaterial
     @Name NVARCHAR(255),
     @Category INT,
     @Price DECIMAL(18,2),
     @CreatedDate DATETIME = GETDATE()
 AS
 BEGIN
     SET NOCOUNT ON;
 
     IF EXISTS (
         SELECT 1
         FROM Materials
         WHERE Name = @Name AND Category = @Category AND IsDeleted = 0
     )
     BEGIN
         RAISERROR('Material with same Name and Category already exists.', 16, 1);
         RETURN;
     END

     INSERT INTO Materials (Id, Name, Category, Price, CreatedDate, IsDeleted)
     VALUES (NEWID(), @Name, @Category, @Price, ISNULL(@CreatedDate, GETDATE()), 0);
 END

 sql

 EXEC InsertMaterial
     @Name = 'Copo Plástico',
     @Category = 1,
     @Price = 5.50;
