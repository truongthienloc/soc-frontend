.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x4 , x0 , 4 
		add     x18 , x0 , x0 
		add     x13 , x0 , x0 
		addi    x16 , x0 , 16 
InArr:
		addi    x9 , x0 , 20 
		addi    x3 , x0 , 76 
		addi    x17 , x0 , 36 
		addi    x29 , x0 , 12 
		sb      x9 , 44 (x16) 
		sb      x3 , 48 (x16) 
		sb      x17 , 52 (x16) 
		sb      x29 , 56 (x16) 
Loop:
		slli    x7 , x13 , 2 
		add     x2 , x7 , x16 
		lb      x10 , 44 (x2) 
		add     x18 , x18 , x10 
		addi    x13 , x13 , 1 
		beq     x13 , x4 , Result 
		jal     x0 , Loop 
Result:
		addi    x30 , x0 , 144 
		bne     x30 , x18 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
