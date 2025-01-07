.text

#The program checks the ALU instruction in I_type

Main:
		addi    x10 , x0 , 104 
		addi    x11 , x0 , 131 
		addi    x25 , x0 , 176 
		bltu    x10 , x11 , Less_i 
		bgeu    x10 , x11 , Bigger_i 
Less_i:
		addi    x27 , x25 , 180 
		andi    x23 , x25 , 155 
		add     x23 , x23 , x27 
		srli    x23 , x23 , 4 
		addi    x28 , x0 , 31 
		bne     x23 , x28 , Fail 
Bigger_i:
		ori     x27 , x25 , 73 
		xori    x23 , x25 , 58 
		add     x23 , x23 , x27 
		srai    x23 , x23 , 2 
		addi    x28 , x0 , 96 
		bne     x23 , x28 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
