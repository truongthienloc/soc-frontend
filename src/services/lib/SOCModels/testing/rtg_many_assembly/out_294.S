.text

#The program checks the ALU instruction in I_type

Main:
		addi    x19 , x0 , 120 
		addi    x7 , x0 , 178 
		addi    x22 , x0 , 45 
		bltu    x19 , x7 , Less_i 
		bgeu    x19 , x7 , Bigger_i 
Less_i:
		addi    x11 , x22 , 153 
		andi    x13 , x22 , 25 
		add     x13 , x13 , x11 
		srli    x13 , x13 , 3 
		addi    x15 , x0 , 25 
		bne     x13 , x15 , Fail 
Bigger_i:
		ori     x11 , x22 , 40 
		xori    x13 , x22 , 61 
		add     x13 , x13 , x11 
		srai    x13 , x13 , 1 
		addi    x15 , x0 , 30 
		bne     x13 , x15 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
