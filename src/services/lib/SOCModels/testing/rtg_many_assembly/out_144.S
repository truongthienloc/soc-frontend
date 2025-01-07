.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x2 , x0 , 4 
		add     x8 , x0 , x0 
		add     x12 , x0 , x0 
		addi    x9 , x0 , 76 
InArr:
		addi    x6 , x0 , 168 
		addi    x31 , x0 , 52 
		addi    x1 , x0 , 64 
		addi    x21 , x0 , 72 
		sw      x6 , 104 (x9) 
		sw      x31 , 108 (x9) 
		sw      x1 , 112 (x9) 
		sw      x21 , 116 (x9) 
Loop:
		slli    x30 , x12 , 2 
		add     x22 , x30 , x9 
		lw      x23 , 104 (x22) 
		add     x8 , x8 , x23 
		addi    x12 , x12 , 1 
		beq     x12 , x2 , Result 
		jal     x0 , Loop
Result:
		addi    x4 , x0 , 356 
		bne     x4 , x8 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
