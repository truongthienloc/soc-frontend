.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x27 , x0 , 4 
		add     x3 , x0 , x0 
		add     x17 , x0 , x0 
		addi    x8 , x0 , 52 
InArr:
		addi    x16 , x0 , 36 
		addi    x24 , x0 , 52 
		addi    x9 , x0 , 68 
		addi    x1 , x0 , 28 
		sb      x16 , 72 (x8) 
		sb      x24 , 76 (x8) 
		sb      x9 , 80 (x8) 
		sb      x1 , 84 (x8) 
Loop:
		slli    x22 , x17 , 2 
		add     x12 , x22 , x8 
		lb      x4 , 72 (x12) 
		add     x3 , x3 , x4 
		addi    x17 , x17 , 1 
		beq     x17 , x27 , Result 
		jal     x0 , Loop 
Result:
		addi    x30 , x0 , 184 
		bne     x30 , x3 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
