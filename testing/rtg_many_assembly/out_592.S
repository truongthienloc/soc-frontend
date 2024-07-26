.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x29 , x0 , 4 
		add     x12 , x0 , x0 
		add     x17 , x0 , x0 
		addi    x20 , x0 , 32 
InArr:
		addi    x18 , x0 , 32 
		addi    x6 , x0 , 60 
		addi    x31 , x0 , 24 
		addi    x2 , x0 , 16 
		sb      x18 , 68 (x20) 
		sb      x6 , 72 (x20) 
		sb      x31 , 76 (x20) 
		sb      x2 , 80 (x20) 
Loop:
		slli    x30 , x17 , 2 
		add     x8 , x30 , x20 
		lb      x10 , 68 (x8) 
		add     x12 , x12 , x10 
		addi    x17 , x17 , 1 
		beq     x17 , x29 , Result 
		jal     x0 , Loop 
Result:
		addi    x7 , x0 , 132 
		bne     x7 , x12 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
