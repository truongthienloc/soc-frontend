.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x8 , x0 , 4 
		add     x21 , x0 , x0 
		add     x4 , x0 , x0 
		addi    x5 , x0 , 20 
InArr:
		addi    x19 , x0 , 104 
		addi    x30 , x0 , 4 
		addi    x16 , x0 , 32 
		addi    x26 , x0 , 48 
		sw      x19 , 4 (x5) 
		sw      x30 , 8 (x5) 
		sw      x16 , 12 (x5) 
		sw      x26 , 16 (x5) 
Loop:
		slli    x28 , x4 , 2 
		add     x12 , x28 , x5 
		lw      x17 , 4 (x12) 
		add     x21 , x21 , x17 
		addi    x4 , x4 , 1 
		beq     x4 , x8 , Result 
		jal     x0 , Loop
Result:
		addi    x22 , x0 , 188 
		bne     x22 , x21 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
