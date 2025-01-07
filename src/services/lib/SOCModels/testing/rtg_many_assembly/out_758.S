.text

#The program checks the ALU instruction in I_type

Main:
		addi    x18 , x0 , 25 
		addi    x29 , x0 , 53 
		addi    x6 , x0 , 129 
		bltu    x18 , x29 , Less_i 
		bgeu    x18 , x29 , Bigger_i 
Less_i:
		addi    x23 , x6 , 142 
		andi    x15 , x6 , 11 
		add     x15 , x15 , x23 
		srli    x15 , x15 , 1 
		addi    x25 , x0 , 136 
		bne     x15 , x25 , Fail 
Bigger_i:
		ori     x23 , x6 , 117 
		xori    x15 , x6 , 125 
		add     x15 , x15 , x23 
		srai    x15 , x15 , 4 
		addi    x25 , x0 , 31 
		bne     x15 , x25 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
