.text

#The program checks the ALU instruction in I_type

Main:
		addi    x21 , x0 , 49 
		addi    x10 , x0 , 48 
		sltu    x22 , x21 , x10 
		bltu    x21 , x10 , Less_i 
		bgeu    x21 , x10 , Bigger_i 
Less_i:
		ori     x30 , x21 , 135 
		sub     x24 , x10 , x21 
		srai    x24 , x24 , 1 
		and     x24 , x24 , x0 
		addi    x7 , x0 , 0 
		beq     x24 , x7 , Pass 
Bigger_i:
		ori     x30 , x21 , 179 
		sub     x24 , x10 , x21 
		srai    x24 , x24 , 0 
		and     x24 , x24 , x0 
		addi    x7 , x0 , 0 
		beq     x24 , x7 , Less_i 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
