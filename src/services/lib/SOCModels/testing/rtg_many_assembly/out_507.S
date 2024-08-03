.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x6 , x0 , 4 
		add     x25 , x0 , x0 
		add     x17 , x0 , x0 
		addi    x26 , x0 , 76 
InArr:
		addi    x29 , x0 , 40 
		addi    x7 , x0 , 48 
		addi    x4 , x0 , 28 
		addi    x18 , x0 , 40 
		sw      x29 , 56 (x26) 
		sw      x7 , 60 (x26) 
		sw      x4 , 64 (x26) 
		sw      x18 , 68 (x26) 
Loop:
		slli    x9 , x17 , 2 
		add     x12 , x9 , x26 
		lw      x13 , 56 (x12) 
		add     x25 , x25 , x13 
		addi    x17 , x17 , 1 
		beq     x17 , x6 , Result 
		jal     x0 , Loop
Result:
		addi    x28 , x0 , 156 
		bne     x28 , x25 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
