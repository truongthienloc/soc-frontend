.text

#The program checks the ALU instruction in I_type

Main:
		addi    x24 , x0 , 132 
		addi    x21 , x0 , 196 
		addi    x10 , x0 , 140 
		bltu    x24 , x21 , Less_i 
		bgeu    x24 , x21 , Bigger_i 
Less_i:
		addi    x19 , x10 , 49 
		andi    x14 , x10 , 28 
		add     x14 , x14 , x19 
		srli    x14 , x14 , 2 
		addi    x11 , x0 , 50 
		bne     x14 , x11 , Fail 
Bigger_i:
		ori     x19 , x10 , 153 
		xori    x14 , x10 , 4 
		add     x14 , x14 , x19 
		srai    x14 , x14 , 2 
		addi    x11 , x0 , 73 
		bne     x14 , x11 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
