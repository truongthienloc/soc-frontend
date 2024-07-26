.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x4 , x0 , 4 
		add     x30 , x0 , x0 
		add     x17 , x0 , x0 
		addi    x3 , x0 , 24 
InArr:
		addi    x20 , x0 , 140 
		addi    x26 , x0 , 0 
		addi    x21 , x0 , 24 
		addi    x29 , x0 , 44 
		sw      x20 , 64 (x3) 
		sw      x26 , 68 (x3) 
		sw      x21 , 72 (x3) 
		sw      x29 , 76 (x3) 
Loop:
		slli    x28 , x17 , 2 
		add     x5 , x28 , x3 
		lw      x27 , 64 (x5) 
		add     x30 , x30 , x27 
		addi    x17 , x17 , 1 
		beq     x17 , x4 , Result 
		jal     x0 , Loop
Result:
		addi    x13 , x0 , 208 
		bne     x13 , x30 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
