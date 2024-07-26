.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x28 , x0 , 4 
		add     x7 , x0 , x0 
		add     x31 , x0 , x0 
		addi    x2 , x0 , 64 
InArr:
		addi    x23 , x0 , 12 
		addi    x29 , x0 , 76 
		addi    x27 , x0 , 4 
		addi    x18 , x0 , 0 
		sb      x23 , 20 (x2) 
		sb      x29 , 24 (x2) 
		sb      x27 , 28 (x2) 
		sb      x18 , 32 (x2) 
Loop:
		slli    x17 , x31 , 2 
		add     x30 , x17 , x2 
		lb      x22 , 20 (x30) 
		add     x7 , x7 , x22 
		addi    x31 , x31 , 1 
		beq     x31 , x28 , Result 
		jal     x0 , Loop 
Result:
		addi    x21 , x0 , 92 
		bne     x21 , x7 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
