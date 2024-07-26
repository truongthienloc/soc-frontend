.text

#The program finds the value of fibonacci 

Fibo:
		addi    x28 , x0 , 6 
		addi    x5 , x0 , 1 
		addi    x11 , x0 , 1 
		addi    x23 , x0 , 3 
		beq     x28 , x0 , Result0 
		beq     x28 , x11 , Result1 
Loop: 
		blt     x28 , x23 , Result 
		add     x25 , x5 , x11 
		addi    x5 , x11 , 0 
		addi    x11 , x25 , 0 
		addi    x23 , x23 , 1 
		jal     x0 , Loop 
Result0:
		addi    x25 , x0 , 0 
		addi    x6 , x0 , 0 
		bne     x25 , x6 , Fail 
Result1:
		addi    x25 , x0 , 1 
		addi    x8 , x0 , 1 
		bne     x25 , x8 , Fail 
Result:
		addi    x22 , x0 , 8 
		bne     x25 , x22 , Result1 

Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
