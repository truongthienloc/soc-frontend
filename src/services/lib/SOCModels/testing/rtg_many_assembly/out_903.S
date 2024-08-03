.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x11 , x0 , 4 
		add     x9 , x0 , x0 
		add     x17 , x0 , x0 
		addi    x29 , x0 , 44 
InArr:
		addi    x26 , x0 , 88 
		addi    x25 , x0 , 12 
		addi    x21 , x0 , 12 
		addi    x28 , x0 , 40 
		sw      x26 , 44 (x29) 
		sw      x25 , 48 (x29) 
		sw      x21 , 52 (x29) 
		sw      x28 , 56 (x29) 
Loop:
		slli    x10 , x17 , 2 
		add     x22 , x10 , x29 
		lw      x8 , 44 (x22) 
		add     x9 , x9 , x8 
		addi    x17 , x17 , 1 
		beq     x17 , x11 , Result 
		jal     x0 , Loop
Result:
		addi    x3 , x0 , 152 
		bne     x3 , x9 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
