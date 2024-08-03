.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x11 , x0 , 4 
		addi    x14 , x0 , 0 
		addi    x21 , x0 , 0 
		addi    x13 , x0 , 76 
InArr:
		addi    x20 , x0 , 56 
		addi    x3 , x0 , 76 
		addi    x15 , x0 , 60 
		addi    x29 , x0 , 8 
		sh      x20 , 8 (x13) 
		sh      x3 , 12 (x13) 
		sh      x15 , 16 (x13) 
		sh      x29 , 20 (x13) 
Loop:
		slli    x30 , x21 , 2 
		add     x6 , x30 , x13 
		lh      x22 , 8 (x6) 
		add     x14 , x14 , x22 
		addi    x21 , x21 , 1 
		beq     x21 , x11 , Result 
		jal     x0 , Loop 
Result:
		addi    x25 , x0 , 200 
		bne     x25 , x14 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
