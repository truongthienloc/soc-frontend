.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x19 , x0 , 4 
		add     x11 , x0 , x0 
		add     x12 , x0 , x0 
		addi    x7 , x0 , 32 
InArr:
		addi    x6 , x0 , 0 
		addi    x25 , x0 , 28 
		addi    x21 , x0 , 76 
		addi    x10 , x0 , 52 
		sb      x6 , 48 (x7) 
		sb      x25 , 52 (x7) 
		sb      x21 , 56 (x7) 
		sb      x10 , 60 (x7) 
Loop:
		slli    x31 , x12 , 2 
		add     x27 , x31 , x7 
		lb      x20 , 48 (x27) 
		add     x11 , x11 , x20 
		addi    x12 , x12 , 1 
		beq     x12 , x19 , Result 
		jal     x0 , Loop 
Result:
		addi    x22 , x0 , 156 
		bne     x22 , x11 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
