.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x4 , x0 , 4 
		add     x27 , x0 , x0 
		add     x6 , x0 , x0 
		addi    x15 , x0 , 64 
InArr:
		addi    x13 , x0 , 24 
		addi    x25 , x0 , 24 
		addi    x20 , x0 , 12 
		addi    x21 , x0 , 32 
		sb      x13 , 76 (x15) 
		sb      x25 , 80 (x15) 
		sb      x20 , 84 (x15) 
		sb      x21 , 88 (x15) 
Loop:
		slli    x30 , x6 , 2 
		add     x8 , x30 , x15 
		lb      x12 , 76 (x8) 
		add     x27 , x27 , x12 
		addi    x6 , x6 , 1 
		beq     x6 , x4 , Result 
		jal     x0 , Loop 
Result:
		addi    x3 , x0 , 92 
		bne     x3 , x27 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
