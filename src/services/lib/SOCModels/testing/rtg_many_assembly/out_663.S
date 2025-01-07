.text

#The program checks the ALU instruction in I_type

Main:
		addi    x17 , x0 , 20 
		addi    x22 , x0 , 180 
		addi    x2 , x0 , 42 
		bltu    x17 , x22 , Less_i 
		bgeu    x17 , x22 , Bigger_i 
Less_i:
		addi    x19 , x2 , 143 
		andi    x3 , x2 , 117 
		add     x3 , x3 , x19 
		srli    x3 , x3 , 1 
		addi    x23 , x0 , 108 
		bne     x3 , x23 , Fail 
Bigger_i:
		ori     x19 , x2 , 128 
		xori    x3 , x2 , 110 
		add     x3 , x3 , x19 
		srai    x3 , x3 , 2 
		addi    x23 , x0 , 59 
		bne     x3 , x23 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
