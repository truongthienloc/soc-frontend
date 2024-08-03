.text

#The program checks the ALU instruction in I_type

Main:
		addi    x1 , x0 , 111 
		addi    x26 , x0 , 110 
		sltu    x28 , x1 , x26 
		bltu    x1 , x26 , Less_i 
		bgeu    x1 , x26 , Bigger_i 
Less_i:
		ori     x7 , x1 , 157 
		sub     x25 , x26 , x1 
		srai    x25 , x25 , 1 
		and     x25 , x25 , x0 
		addi    x2 , x0 , 0 
		beq     x25 , x2 , Pass 
Bigger_i:
		ori     x7 , x1 , 114 
		sub     x25 , x26 , x1 
		srai    x25 , x25 , 2 
		and     x25 , x25 , x0 
		addi    x2 , x0 , 0 
		beq     x25 , x2 , Less_i 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
