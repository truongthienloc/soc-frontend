.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x8 , x0 , 4 
		add     x2 , x0 , x0 
		add     x18 , x0 , x0 
		addi    x21 , x0 , 28 
InArr:
		addi    x27 , x0 , 24 
		addi    x31 , x0 , 76 
		addi    x23 , x0 , 12 
		addi    x4 , x0 , 28 
		sb      x27 , 0 (x21) 
		sb      x31 , 4 (x21) 
		sb      x23 , 8 (x21) 
		sb      x4 , 12 (x21) 
Loop:
		slli    x25 , x18 , 2 
		add     x3 , x25 , x21 
		lb      x29 , 0 (x3) 
		add     x2 , x2 , x29 
		addi    x18 , x18 , 1 
		beq     x18 , x8 , Result 
		jal     x0 , Loop 
Result:
		addi    x13 , x0 , 140 
		bne     x13 , x2 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
