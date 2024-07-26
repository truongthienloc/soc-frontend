.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x17 , x0 , 4 
		add     x24 , x0 , x0 
		add     x12 , x0 , x0 
		addi    x30 , x0 , 44 
InArr:
		addi    x31 , x0 , 124 
		addi    x26 , x0 , 12 
		addi    x2 , x0 , 36 
		addi    x20 , x0 , 52 
		sw      x31 , 0 (x30) 
		sw      x26 , 4 (x30) 
		sw      x2 , 8 (x30) 
		sw      x20 , 12 (x30) 
Loop:
		slli    x16 , x12 , 2 
		add     x6 , x16 , x30 
		lw      x28 , 0 (x6) 
		add     x24 , x24 , x28 
		addi    x12 , x12 , 1 
		beq     x12 , x17 , Result 
		jal     x0 , Loop
Result:
		addi    x21 , x0 , 224 
		bne     x21 , x24 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
