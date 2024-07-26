.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x18 , x0 , 4 
		add     x16 , x0 , x0 
		add     x27 , x0 , x0 
		addi    x12 , x0 , 36 
InArr:
		addi    x10 , x0 , 0 
		addi    x24 , x0 , 72 
		addi    x7 , x0 , 32 
		addi    x23 , x0 , 56 
		sb      x10 , 20 (x12) 
		sb      x24 , 24 (x12) 
		sb      x7 , 28 (x12) 
		sb      x23 , 32 (x12) 
Loop:
		slli    x4 , x27 , 2 
		add     x15 , x4 , x12 
		lb      x25 , 20 (x15) 
		add     x16 , x16 , x25 
		addi    x27 , x27 , 1 
		beq     x27 , x18 , Result 
		jal     x0 , Loop 
Result:
		addi    x29 , x0 , 160 
		bne     x29 , x16 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
